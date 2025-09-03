---
level: 0
subjects:
  - CTF
title: My OSCP experience
language: pt-br
translations:
  - pt-br
date: "2025-09-03"
description: My journey to get the OSCP certification.
imageNameKey: array
---

Hi guys, i don't if can help anyone but i will a bit of my experience to get the OSCP certification. 

Since English isn’t my first language, I wrote some of this on my own and asked ChatGPT to help me polish a few parts.

# Introduction

One random day I woke up, checked my emails, and saw one with the subject: **“Offensive Security.”**

My company had bought the OSCP voucher with 90 days of labs. Nobody at the company had ever told me about buying a certification before, so it honestly gave me a scare. At that moment, I was thinking: _“Jesus, I only have 90 days of labs, not much time to prepare for the exam, and I still need to keep working too.”_ That was the moment I realized I needed to have a plan.

My goal was to pass on the first attempt, since the company paid for the certification, and a retake would be quite expensive — especially in Brazil.

# Understading and Planning

In the first moment i read a lot of posts about OSCP experiences on internet to understand how the people built their plan to pass in the first attempt.

As a pentester, WEB is very OK to me, since i have extensive hands-on professional experiencie in this area.  But there's somethings that i consider my weakness: Active Directory and Privilege Escalation on Windows. 

Reading theses posts i got some important things that i had to do:
1. Use some editor to document everything that i learn.
2. Follow a list of OSCP-like machines to practice.
3. Create a methodology.
4. Focus in my weakness until it becomes my strongest skill (AD and Privesc Windows). 

# Note Take - Obsidian
To note things and build a structure i used Obsidian, it's my favorite editor ever, so thats was easy. 

The structure that i created is very simple, concept notes and practice notes. The concept notes just explain a concept and the practice note hold some informations like commands and code. 

A concept Note
![](/public/My_Experience_in_OSCP_1.png)

A practice Note
![](/public/My%20Experience%20in%20OSCP_2.png)


I followed this methodology to everything that i learned during the PEN-300 course. So this helped me to remember things and commands very fast, and no waste a lot of time searching again.

It's very important you create Playbook to yourself to exploit vulnerabilities, you can note tips to yourself in the future, this help me A LOT in the exam.


This is a example of my obsidian Graph Views to understand it.
![](/public/My%20Experience%20in%20OSCP.png)


## List of OSCP-like Machines

It's not secret, i follow the list of TJNull PWK v3 to OSCP-like machines. \
https://docs.google.com/spreadsheets/d/1dwSMIAPIam0PuRBkCiDI88pU3yzrqqHkDtBngUHNCw8/edit?pli=1&gid=129517485#gid=129517485

Later i discovered a new list from Lainkusanagi OSCP Like 
https://docs.google.com/spreadsheets/d/18weuz_Eeynr6sXFQ87Cd5F0slOj9Z6rt/

I started with HTB boxes and when i finished all i went to Proving Grounds Boxes. For each machine I complete, I change the line color to mark it as done, this help me see my own progress. 

In my opinion,  HTB boxes are really harder than Proving Grounds boxes, but both are fun.

Please, write a documentation (writeup) of all boxes you complete, this help you to understand attacks and fix it in your memory. This was very important to me. 

Last tip: read writeups!!! it's really useful to understand and learn new techniques. 

# Quick Commands and scripts - SnippetLab
When I was learning Active Directory, I realized that I needed to remember and save a lot of quick commands, syntax, scripts, and so on, so I started using this tool called SnippetLab. 

SnippetLab is a software where you can store quick commands, scripts, code, and more, and organize them with tags, directories, and other options. Actually, I could use Obsidian for this, but for this purpose I think SnippetLab easier to use it. 

With SnippetLab, I saved all my PowerShell commands, Nmap commands, enumeration scripts, Hashcat syntax, and more. 

In my case, i also can use raycast to access the Snippetlab, copy and paste it, this help me to own machines faster.

The imagem below is a example of my SnippetLab.
![](/public/My%20Experience%20in%20OSCP_3.png)


This imagem below is a example of use raycast to access to copy commands from snippetlab.

![](/public/My%20Experience%20in%20OSCP_5.png)


![](/public/My%20Experience%20in%20OSCP_4.png)


# Methodology 

I use **Obsidian** not only for general note-taking, but also as a structured system to build and follow my own pentesting methodology. Inside a dedicated vault, I created **ready-to-use templates** that act like smart checklists, helping me keep consistency across engagements.

For example, when I discover a new credential, I create a note from the _credential template_.

![](/public/My%20Experience%20in%20OSCP_6.png)

![](/public/My%20Experience%20in%20OSCP_7.png)


When I compromise a Linux machine, I create a **new note from a privilege escalation template** inside Obsidian. This note is linked to the specific target and includes a detailed **checklist** to guide the enumeration and privilege escalation process.

Image Example: 
![](/public/My%20Experience%20in%20OSCP_8.png)



Obsidian played a key role in helping me create my own methodology for the **OSCP**. I built structured templates and checklists inside a dedicated vault, which allowed me to track progress, stay consistent, and avoid missing important steps during my practice.

The idea actually came from my **real-life pentest experience**, where I was already using Obsidian to organize findings, credentials, and privilege escalation paths. Adapting this workflow to OSCP preparation made the process much more efficient and reliable.

# Reporting

To report i used sysreptor.com, it's a software that you can run locally to generate reports from markdown to PDF, it's very simple to use.

https://docs.sysreptor.com/

# First atttempt - 60/100

So this was my first attempt. I hadn’t slept well the night before because of all the anxiety about the exam. Ended up sleeping just a little, which only made me more nervous the next morning. The exam started at 9 a.m.

At first, I grabbed the IPs from the dashboard, and that’s when I made my first — and fatal — mistake. I was so anxious that I skimmed through the instructions and totally missed the fact that the AD already had an initial credential provided. Because of that, I wasted more than six hours trying to break into a machine that had no vulnerability at all, since the key was actually using that credential.

Still not realizing this, I took a break from the AD machine and tried some others. I managed to compromise one and escalate privileges, which gave me 20 points. From there, things got rough: long hours without any progress. Couldn’t get into AD, couldn’t get another machine, couldn’t escalate. That’s when I made my second mistake: I took a pill of Vyvanse, hoping it would help me focus.

Instead, it just made me nine times more anxious than I already was. My back hurt, stress went through the roof, and I was just spiraling.

Seven hours into the exam, while taking a break, I went back to read the instructions carefully… and finally saw the credential I had TOTALLY ignored. At that point, I was already swearing at myself.

With that credential, I managed to compromise AD in about four hours, which gave me 40 points. But I had already lost so much time. All that was left was pulling an all-nighter, trying to get just one more flag to reach 70 points — but I couldn’t make it.

When the exam ended, I felt this weird mix of relief (because the anxiety finally calmed down) and sadness, or rather defeat. It felt like I wasn’t good enough. The hardest part was dealing with that feeling in the following weeks. I took about two weeks off, did nothing, just to get my head back in the game before I started studying again.

# Second Attempt - 100/100

The second time was easy peasy. I was confident, had slept better, even worked out the day before — I felt ready for the exam. This time I scheduled it later, at 12 p.m.

So, exam day. After OffSec’s whole environment check procedure, I kicked things off.

I started with Active Directory (this time with credentials in hand). In about 3–4 hours, I had escalated privileges, pivoted into the internal network, and fully compromised the AD environment. That alone gave me 40 points and a huge morale boost to keep pushing through the rest.

In the next two hours, I compromised two standalone machines, adding another 40 points. At that point, I already had enough to pass, but I wanted to go for the perfect 100/100.

The last standalone, though, was a real beast. Unlike the others, the initial foothold was super tough — by far the hardest part of the whole exam. It ate up about 3–4 hours just to get in. But once inside, privilege escalation was a breeze, done in under 30 minutes.

By 9 p.m., I had 100/100. Unlike my first attempt, I actually went to sleep, and the next morning I used the extra time to carefully review all my Obsidian notes and make sure everything was solid.

# Conclusion

The hardest part of the exam process, at least for me, was dealing with the anxiety while balancing study and work. It’s really important to keep a routine, write down your own methodologies, and read a lot of experiences from others, and practice HARD. Putting all these things together gives you confidence in your skills, and that confidence makes it much easier to handle the anxiety.

Drink water, eat well, try hard on the machines CTFs, read write-ups, and make sure to write your own, that’s pretty much most of what you really need.

