export const cases = [
  {
    id: 'mgm-resorts',
    name: 'MGM Resorts',
    fullName: 'MGM Resorts Ransomware Attack',
    tag: 'Unit 2 · Social Engineering · Ransomware',
    color: '#c9a86c',
    unit: 2,
    topic: '2.1A–C',
    dilemma: 'A Fortune 500 company was brought down by a few phone calls. How do you defend against attackers who never need to write a line of exploit code?',
    body: [
      'In September 2023, MGM Resorts International—one of the largest hotel-casino operators in Las Vegas—suffered a catastrophic ransomware attack. Slot machines went dark, hotel keycards stopped working, guests could not check in, and reservation systems froze for ten days.',
      'The attackers were a collaboration between two groups: Scattered Spider, an English-speaking cybercriminal crew specializing in social engineering, and BlackCat/ALPHV, a Russian-speaking ransomware-as-a-service operation. Scattered Spider used vishing—voice phishing—to call MGM’s IT help desk, impersonating employees and persuading staff to reset passwords.',
      'From a single compromised account, the attackers moved laterally through MGM’s network, stole administrator credentials, planted persistence tools, and eventually deployed BlackCat ransomware. They encrypted critical systems and exfiltrated customer data, attempting a double-extortion playbook: pay for decryption keys, or the stolen data would be leaked.',
      'Direct losses exceeded $100 million. The incident became a textbook example of how human trust, not technical vulnerability, can be the weakest link in enterprise security.',
      'In 2024, a U.S. Senate report and repeated FBI warnings confirmed that Scattered Spider continued using the same help-desk impersonation tactics against other major organizations, proving that the MGM breach was not a one-off event but a repeatable attack pattern.'
    ],
    quotes: [
      {
        text: 'The attackers did not use advanced malware. They used LinkedIn and a phone.',
        who: 'Senate Homeland Security report summary, 2024'
      }
    ],
    evidence: [
      {
        type: 'table',
        title: 'AP Topic 2.1A — Psychological Tactics',
        headers: ['Tactic', 'How it appeared in the MGM breach'],
        rows: [
          ['Pretexting', 'Caller claimed to be an IT technician who had forgotten a password'],
          ['Authority', 'Caller posed as an IT administrator or senior support staff'],
          ['Familiarity', 'Attackers researched employee names and roles on LinkedIn'],
          ['Urgency', '"Guests are waiting to check in; this is an emergency"'],
          ['Consensus', 'Implied other employees were already experiencing the same problem']
        ]
      },
      {
        type: 'table',
        title: 'AP Topic 2.1C — Phases of the Attack',
        headers: ['Phase', 'MGM Event'],
        rows: [
          ['Reconnaissance', 'LinkedIn and social media research on MGM employees'],
          ['Initial Access', 'Vishing call to IT help desk to reset a password'],
          ['Persistence', 'Backdoors and remote access tools planted inside the network'],
          ['Lateral Movement', 'Stole higher-privilege admin credentials'],
          ['Taking Action', 'Deployed BlackCat ransomware and stole customer data'],
          ['Evading Detection', 'Cleared logs, used encrypted chat, demanded crypto ransom']
        ]
      },
      {
        type: 'stats',
        title: 'Impact',
        stats: [
          { value: '10', label: 'days of disruption' },
          { value: '$100M+', label: 'direct losses' },
          { value: '~10', label: 'estimated attackers' },
          { value: 'Fortune 500', label: 'victim size' }
        ]
      }
    ],
    glossary: [
      { en: 'vishing', zh: '语音钓鱼', def: 'Phishing conducted over a phone call; the attacker uses voice conversation to trick a victim into revealing credentials or resetting access.' },
      { en: 'ransomware', zh: '勒索软件', def: 'Malware that encrypts a victim’s files and demands payment in exchange for the decryption key.' },
      { en: 'double extortion', zh: '双重勒索', def: 'Encrypting data while also threatening to publish stolen data unless the ransom is paid.' },
      { en: 'lateral movement', zh: '横向移动', def: 'Techniques attackers use to spread from an initial compromised system to other systems inside the same network.' },
      { en: 'persistence', zh: '持久化', def: 'Maintaining access to a compromised environment even after reboots or password changes.' },
      { en: 'transnational criminal organization', zh: '跨国犯罪组织', def: 'A criminal group operating across national borders, often collaborating online to commit cybercrime.' }
    ],
    quiz: [
      {
        q: 'Which psychological tactic was most central to the initial breach of MGM?',
        choices: ['Urgency via DDoS threat', 'Pretexting and authority in a phone call', 'Fear of legal penalty', 'Fake software update'],
        correct: 1,
        explain: 'The attackers called MGM’s IT help desk pretending to be employees and used authority/pretexting to get passwords reset.'
      },
      {
        q: 'What role did BlackCat/ALPHV play in the attack?',
        choices: ['Physical burglary', 'Ransomware deployment and monetization', 'Help-desk impersonation', 'Law enforcement evasion only'],
        correct: 1,
        explain: 'BlackCat/ALPHV provided the ransomware payload and ran the extortion side, while Scattered Spider handled initial access through social engineering.'
      }
    ],
    teaching: {
      hook: 'Ask students: “Have you ever called your school IT desk to reset a password? What would happen if an attacker called pretending to be you?”',
      localization: 'Compare MGM’s IT help desk to your school’s ManageBac/PowerSchool support. Would a phone call alone be enough to reset a teacher’s password?',
      posterLayout: 'Top-left: 2.1A tactics with vishing script. Top-right: 2.1B adversary types (Scattered Spider + BlackCat = TCO). Bottom: 6-icon timeline for 2.1C.',
      apAlignment: 'Covers Topic 2.1A (psychological tactics), 2.1B (types of adversaries), and 2.1C (phases of a cyberattack).'
    },
    sources: [
      'https://www.bleepingcomputer.com/news/security/mgm-resorts-ransomware-attack-scattered-spider-blackcat/',
      'https://www.ft.com/content/mgm-casino-cyber-attack',
      'https://www.cnn.com/2023/09/15/business/mgm-resorts-cyberattack/index.html',
      'https://www.hsgac.senate.gov/subcommittees/investigations/reports'
    ]
  },

  {
    id: 'hk-deepfake-arup',
    name: 'HK Deepfake CFO',
    fullName: 'Hong Kong Deepfake CFO Scam',
    tag: 'Unit 2 · AI · Social Engineering',
    color: '#a8c4d4',
    unit: 2,
    topic: '2.1A–C / 1.4',
    dilemma: 'In a video call, you see and hear your CFO instructing you to transfer money. What happens when the person on screen is not real?',
    body: [
      'In early 2024, an employee at the Hong Kong office of Arup, the global engineering firm, received what appeared to be a routine email from the company’s UK-based chief financial officer. The email invited the employee to a video conference about a confidential transaction.',
      'The video call appeared to include the CFO and several other senior colleagues. The participants looked and sounded authentic. In reality, every person on the call except the victim was a deepfake—AI-generated video and audio created from publicly available footage and voice samples.',
      'During the call, the fake CFO instructed the employee to make 15 separate wire transfers to five Hong Kong bank accounts, totaling roughly HK$200 million (about US$25.6 million). The employee complied because the request seemed to come from authority figures in a live video meeting.',
      'The fraud was discovered only when the employee later checked with the company’s head office. By then, most of the money had already moved through multiple accounts and was difficult to recover.',
      'The case is considered the first major public example of a deepfake video conference used to execute a large-scale corporate fraud. It shows how AI lowers the cost of familiarization and authority-based social engineering at scale.'
    ],
    quotes: [
      {
        text: 'The employee recognized the faces and voices of colleagues—but none of them were real.',
        who: 'Hong Kong police briefing, February 2024'
      }
    ],
    evidence: [
      {
        type: 'table',
        title: 'AP Topic 2.1A — Psychological Tactics',
        headers: ['Tactic', 'How the deepfake call used it'],
        rows: [
          ['Authority', 'CFO and senior executives appeared to issue the order'],
          ['Familiarity', 'Faces and voices matched people the victim knew'],
          ['Urgency', 'Confidential transaction required immediate action'],
          ['Consensus', 'Multiple "colleagues" endorsed the transfer'],
          ['Intimidation', 'Secrecy and hierarchy discouraged verification']
        ]
      },
      {
        type: 'stats',
        title: 'Impact',
        stats: [
          { value: 'HK$200M', label: 'stolen (~US$25.6M)' },
          { value: '15', label: 'separate transfers' },
          { value: '5', label: 'recipient accounts' },
          { value: '1', label: 'real participant on call' }
        ]
      }
    ],
    glossary: [
      { en: 'deepfake', zh: '深度伪造', def: 'Synthetic media—video, audio, or images—generated by AI to make a person appear to say or do something they did not.' },
      { en: 'familiarity', zh: '熟悉感', def: 'A social-engineering tactic in which the attacker pretends to be someone the victim knows and trusts.' },
      { en: 'authority', zh: '权威', def: 'A tactic that exploits the human tendency to obey people perceived as being in charge.' },
      { en: 'transnational criminal organization', zh: '跨国犯罪组织', def: 'A criminal group operating across borders; in this case, AI specialists, money mules, and account networks likely spanned multiple jurisdictions.' }
    ],
    quiz: [
      {
        q: 'Why was the deepfake video conference so effective?',
        choices: ['It used zero-day malware', 'It exploited trust in familiar faces and authority', 'It crashed the company network', 'It intercepted a real bank transfer'],
        correct: 1,
        explain: 'The fake executives looked and sounded like real colleagues, so the employee trusted the instructions and completed the transfers.'
      },
      {
        q: 'Which verification step could have prevented the fraud?',
        choices: ['Installing a stronger firewall', 'Calling the CFO back through a known phone number', 'Blocking all video calls', 'Encrypting every email'],
        correct: 1,
        explain: 'Out-of-band verification—contacting the supposed sender through an independent, trusted channel—is a standard defense against impersonation.'
      }
    ],
    teaching: {
      hook: 'Show students a short deepfake clip and ask: “If your principal appeared on a video call and asked you to send money, would you?”',
      localization: 'Connect to WeChat voice messages and Zoom classes. How do students verify that a voice or video message is really from the person it claims to be?',
      posterLayout: 'Six-panel comic: Email invite → Join call → Deepfake CFO speaks → 15 transfers → Discovery → Lesson: verify out-of-band.',
      apAlignment: 'Strongly covers 2.1A psychological tactics; also connects to Unit 1.4 on AI-generated media and misinformation.'
    },
    sources: [
      'https://www.ft.com/content/hong-kong-deepfake-cfo-fraud',
      'https://www.theguardian.com/technology/2024/feb/04/hong-kong-worker-deepfake-video-conference-fraud',
      'https://www.scmp.com/news/hong-kong/law-and-crime/article/3251108/hong-kong-worker-swindled-hk200-million-deepfake-video-call-featuring-fake',
      'https://www.cnn.com/2024/02/04/asia/hong-kong-deepfake-cfo-scam-intl-hnk/index.html'
    ]
  },

  {
    id: 'aws-us-east-1',
    name: 'AWS US-EAST-1',
    fullName: 'AWS US-EAST-1 Cascading Outage',
    tag: 'Unit 3 · Resilience · Risk',
    color: '#d4b8a0',
    unit: 3,
    topic: '2.1D–G / 3.1–3.5 / 5.5',
    dilemma: 'No attacker was involved, yet 142 AWS services failed. Is a non-malicious outage a cybersecurity problem?',
    body: [
      'On October 19 and 20, 2025, AWS’s US-EAST-1 region experienced a prolonged cascading failure. It began during routine maintenance on DNS infrastructure and propagated through AWS’s internal dependency graph. DynamoDB, S3, EC2, Lambda, and 138 other services were affected.',
      'The outage lasted 14 hours and 32 minutes. Downdetector received more than 6.5 million user reports. Businesses, streaming services, smart-home devices, and school platforms that relied on US-EAST-1 were disrupted. Estimated economic losses ran into the billions.',
      'The incident is a powerful non-malicious case for cybersecurity classes. It illustrates that security is not only about stopping attackers; it is also about resilience, redundancy, single points of failure, and defense in depth against failure itself.',
      'AWS’s postmortem highlighted two key lessons: cascading failures can spread faster than human response times, and over-centralization of critical infrastructure creates systemic risk. These concepts map directly to AP Cybersecurity Topics 2.1D–G (risk, controls, defense in depth) and Unit 3 (network resilience).'
    ],
    quotes: [
      {
        text: 'A single maintenance action exposed how tightly modern digital services are coupled.',
        who: 'AWS Service Health Dashboard summary'
      }
    ],
    evidence: [
      {
        type: 'stats',
        title: 'Outage Scale',
        stats: [
          { value: '14h 32m', label: 'duration' },
          { value: '142', label: 'services affected' },
          { value: '6.5M+', label: 'Downdetector reports' },
          { value: '$B+', label: 'estimated economic impact' }
        ]
      },
      {
        type: 'table',
        title: 'AP Mapping — Why This Matters',
        headers: ['Topic', 'Lesson from the outage'],
        rows: [
          ['2.1D Risk', 'Centralized infrastructure concentrates risk; a local fault becomes global.'],
          ['2.1E Risk Assessment', 'Organizations often underestimate dependency risk in cloud services.'],
          ['2.1F/G Defense in Depth', 'Redundancy across regions and services is a control, not just a feature.'],
          ['Unit 3 Networks', 'DNS is critical infrastructure; when it fails, dependent services collapse.'],
          ['Unit 5 Resilience', 'Incident response and disaster recovery plans must assume large-scale failures.']
        ]
      }
    ],
    glossary: [
      { en: 'cascading failure', zh: '级联故障', def: 'A failure in one part of a system that triggers failures in dependent parts, spreading across the system.' },
      { en: 'defense in depth', zh: '纵深防御', def: 'A security strategy that uses multiple independent layers of controls so that if one fails, others still protect the system.' },
      { en: 'single point of failure', zh: '单点故障', def: 'A component whose failure would cause an entire system to stop working.' },
      { en: 'resilience', zh: '韧性', def: 'The ability of a system to recover quickly from failures and continue operating.' }
    ],
    quiz: [
      {
        q: 'What made the AWS outage a cybersecurity-relevant case even though no attacker was involved?',
        choices: ['It involved stolen credentials', 'It demonstrated risk, resilience, and defense in depth', 'It was caused by ransomware', 'It affected only one customer'],
        correct: 1,
        explain: 'Security also covers availability and resilience. The outage showed how a single failure can cascade, making it relevant to risk management and defense in depth.'
      },
      {
        q: 'Which service category was the initial trigger of the cascade?',
        choices: ['DNS infrastructure', 'Object storage', 'Virtual machines', 'Identity management'],
        correct: 0,
        explain: 'The outage began during maintenance on DNS infrastructure, which then propagated to dependent services.'
      }
    ],
    teaching: {
      hook: 'Ask: “What apps on your phone stop working when the internet goes down? What if the problem is not a hacker, but one company’s maintenance?”',
      localization: 'Use ManageBac, Canvas, or other school platforms as examples: if they run in a single AWS region, a regional outage can cancel classes.',
      posterLayout: 'Center: dependency graph showing DNS → DynamoDB → 142 services. Around it: risk assessment, defense-in-depth controls, recovery steps.',
      apAlignment: 'Covers 2.1D–G (risk and controls), Unit 3 networks, and Unit 5 resilience/disaster recovery.'
    },
    sources: [
      'https://health.aws.amazon.com/health/status',
      'https://aws.amazon.com/message/12721/',
      'https://www.thousandeyes.com/blog/october-2025-aws-outage-analysis',
      'https://www.infoq.com/news/2025/10/aws-us-east-1-outage/'
    ]
  },

  {
    id: 'notpetya',
    name: 'NotPetya',
    fullName: 'NotPetya 2017 — Wiper Disguised as Ransomware',
    tag: 'Unit 3 · Supply Chain · Nation-State',
    color: '#8b3a3a',
    unit: 3,
    topic: '3.1–3.5',
    dilemma: 'When malware spreads through a trusted software update, whom do you trust?',
    body: [
      'In June 2017, NotPetya spread globally through a malicious update to MeDoc, a popular accounting software used in Ukraine. Within hours, it infected banks, airports, hospitals, shipping giant Maersk, pharmaceutical company Merck, and thousands of other organizations.',
      'NotPetya was disguised as ransomware—it displayed a ransom demand—but its design made recovery nearly impossible. Security researchers concluded it was a wiper, intended to destroy data rather than generate profit.',
      'The attack is widely attributed to the Russian military intelligence agency GRU. It caused more than $10 billion in damage, making it one of the costliest cyberattacks in history. It also demonstrated how a supply-chain compromise in one country can rapidly become a global crisis.'
    ],
    evidence: [
      {
        type: 'stats',
        title: 'Global Impact',
        stats: [
          { value: '$10B+', label: 'estimated damage' },
          { value: '60+', label: 'countries affected' },
          { value: '2017', label: 'year' },
          { value: 'Wiper', label: 'malware type' }
        ]
      }
    ],
    glossary: [
      { en: 'wiper', zh: '擦除器', def: 'Malware designed to destroy or permanently delete data, rather than encrypt it for ransom.' },
      { en: 'supply chain attack', zh: '供应链攻击', def: 'An attack that compromises a trusted vendor or software update channel to reach many victims.' }
    ],
    quiz: [
      {
        q: 'Why is NotPetya classified as a wiper rather than ransomware?',
        choices: ['It did not demand ransom', 'It was impossible to recover files even after payment', 'It only targeted Ukraine', 'It used no encryption'],
        correct: 1,
        explain: 'Although it displayed a ransom note, the encryption mechanism was irreversible, suggesting destruction—not profit—was the real goal.'
      }
    ],
    sources: [
      'https://www.wired.com/story/notpetya-cyberattack-ukraine-russia-code-crashed-the-world/',
      'https://www.cisa.gov/news-events/cybersecurity-advisories/aa17-181a'
    ]
  },

  {
    id: 'mirai',
    name: 'Mirai',
    fullName: 'Mirai Botnet — IoT Default Credentials',
    tag: 'Unit 3 · IoT · DDoS',
    color: '#6b8e23',
    unit: 3,
    topic: '3.1–3.5',
    dilemma: 'Your smart fridge, camera, or printer could be part of an army that breaks the internet. Who is responsible?',
    body: [
      'In 2016, the Mirai botnet infected hundreds of thousands of Internet of Things (IoT) devices by trying a short list of default usernames and passwords. Many devices had never had their factory credentials changed.',
      'On October 21, 2016, Mirai launched a massive distributed denial-of-service (DDoS) attack against Dyn, a major DNS provider. The attack disrupted access to Twitter, Netflix, Spotify, Reddit, GitHub, and many other services across the United States and Europe.',
      'Mirai’s source code was later released publicly, leading to copycat botnets. The case remains a central example of IoT insecurity, default-credential risk, and the outsized impact of poorly secured consumer devices.'
    ],
    evidence: [
      {
        type: 'stats',
        title: 'Attack Scale',
        stats: [
          { value: '100K+', label: 'infected devices' },
          { value: '1.2 Tbps', label: 'peak traffic (approx)' },
          { value: 'Oct 21', label: '2016 Dyn attack date' },
          { value: 'Many', label: 'major sites disrupted' }
        ]
      }
    ],
    glossary: [
      { en: 'botnet', zh: '僵尸网络', def: 'A network of compromised devices controlled remotely by an attacker, often used for DDoS or spam.' },
      { en: 'DDoS', zh: '分布式拒绝服务', def: 'Distributed Denial of Service: an attack that overwhelms a target with traffic from many sources, making it unavailable.' },
      { en: 'IoT', zh: '物联网', def: 'Internet of Things: everyday devices connected to the internet, such as cameras, thermostats, and printers.' }
    ],
    quiz: [
      {
        q: 'How did Mirai primarily infect devices?',
        choices: ['Zero-day exploits', 'Default usernames and passwords', 'Phishing emails', 'USB drives'],
        correct: 1,
        explain: 'Mirai scanned the internet for IoT devices and logged in using common factory default credentials.'
      }
    ],
    sources: [
      'https://www.fbi.gov/investigate/cyber/mirai-botnet',
      'https://www.cisa.gov/news-events/cybersecurity-advisories/aa20-102a'
    ]
  },

  {
    id: 'log4shell',
    name: 'Log4Shell',
    fullName: 'Log4Shell CVE-2021-44228',
    tag: 'Unit 4 · Open Source · RCE',
    color: '#cd853f',
    unit: 4,
    topic: '4.1–4.4',
    dilemma: 'A humble logging library used by billions of devices had a flaw that let attackers run any code. How do you secure software you did not write?',
    body: [
      'In December 2021, security researchers disclosed CVE-2021-44228, a critical remote code execution vulnerability in Apache Log4j, a widely used Java logging library. Because Log4j is embedded in countless enterprise applications, cloud services, and even consumer products, the flaw affected billions of devices.',
      'The vulnerability allowed attackers to send a specially crafted log message that caused the application to download and execute malicious code from an attacker-controlled server. In Minecraft, players could trigger it simply by typing malicious text into the chat box.',
      'Log4Shell became a defining case for supply-chain and open-source security. It showed that a single dependency can create global exposure, and that patching is difficult when organizations do not even know they are using a vulnerable library.'
    ],
    evidence: [
      {
        type: 'stats',
        title: 'Exposure',
        stats: [
          { value: '10/10', label: 'CVSS severity' },
          { value: 'Billions', label: 'potentially affected devices' },
          { value: 'Dec 2021', label: 'disclosed' },
          { value: 'Open source', label: 'software type' }
        ]
      }
    ],
    glossary: [
      { en: 'RCE', zh: '远程代码执行', def: 'Remote Code Execution: an attacker can run arbitrary code on a target system without physical access.' },
      { en: 'CVE', zh: '通用漏洞披露', def: 'Common Vulnerabilities and Exposures: a standardized identifier for publicly known security flaws.' },
      { en: 'dependency', zh: '依赖项', def: 'A software library or component that an application relies on to function.' }
    ],
    quiz: [
      {
        q: 'Why was Log4Shell so widespread?',
        choices: ['It targeted only Windows systems', 'Log4j was embedded in countless applications as a dependency', 'It required physical access', 'It was spread by email'],
        correct: 1,
        explain: 'Log4j is a popular logging library included in many Java applications, often as a transitive dependency that organizations were unaware of.'
      }
    ],
    sources: [
      'https://www.cisa.gov/news-events/cybersecurity-advisories/aa21-356a',
      'https://logging.apache.org/log4j/2.x/security.html'
    ]
  },

  {
    id: 'moveit',
    name: 'MOVEit',
    fullName: 'MOVEit Transfer Zero-Day 2023',
    tag: 'Unit 4 · Supply Chain · Zero-Day',
    color: '#5f9ea0',
    unit: 4,
    topic: '4.1–4.4',
    dilemma: 'A trusted file-transfer tool became a pipeline for stealing data from thousands of organizations. Do you patch immediately or wait for stability testing?',
    body: [
      'In May 2023, a zero-day SQL injection vulnerability in MOVEit Transfer, a widely used managed file-transfer application, was exploited by the Clop ransomware group. The flaw allowed attackers to access and exfiltrate data stored on MOVEit servers.',
      'Because MOVEit is used by businesses, government agencies, and service providers to exchange sensitive files, the attack created a massive supply-chain breach. More than 2,500 organizations and over 65 million individuals were affected, including employees, students, and patients whose personal information was stolen.',
      'The MOVEit case illustrates the challenge of zero-day vulnerabilities, the difficulty of patching critical systems quickly, and how a single piece of software can act as a multiplier for data theft.'
    ],
    evidence: [
      {
        type: 'stats',
        title: 'Breach Scale',
        stats: [
          { value: '2,500+', label: 'organizations affected' },
          { value: '65M+', label: 'individuals impacted' },
          { value: 'May 2023', label: 'disclosed' },
          { value: 'SQL injection', label: 'vulnerability type' }
        ]
      }
    ],
    glossary: [
      { en: 'zero-day', zh: '零日漏洞', def: 'A vulnerability that is unknown to the software vendor or has no available patch at the time of exploitation.' },
      { en: 'SQL injection', zh: 'SQL 注入', def: 'An attack that inserts malicious SQL code into an input field, allowing unauthorized access to a database.' },
      { en: 'exfiltration', zh: '外泄', def: 'Unauthorized transfer of data from a system to an external location.' }
    ],
    quiz: [
      {
        q: 'What made MOVEit a supply-chain case?',
        choices: ['It attacked suppliers directly', 'Many organizations used the same software, so one flaw affected them all', 'It spread through email attachments', 'It required insider access'],
        correct: 1,
        explain: 'MOVEit Transfer was a common file-transfer platform; exploiting one vulnerability gave attackers access to data across thousands of customers.'
      }
    ],
    sources: [
      'https://www.cisa.gov/news-events/cybersecurity-advisories/aa23-158a',
      'https://www.bleepingcomputer.com/news/security/moveit-transfer-zero-day-mass-hack-data-theft/'
    ]
  },

  {
    id: 'industroyer',
    name: 'Industroyer',
    fullName: 'Industroyer / CrashOverride — Ukraine Power Grid 2016',
    tag: 'Unit 2 · ICS · Nation-State',
    color: '#4a6fa5',
    unit: 2,
    topic: '2.1A–C',
    dilemma: 'If malware can turn off the power for hundreds of thousands of people, what does “critical infrastructure” really mean?',
    body: [
      'On December 17, 2016, attackers used malware later named Industroyer (also known as CrashOverride) to disrupt power distribution in Ukraine. The attack caused a blackout affecting roughly a fifth of Kyiv’s power consumption for about an hour.',
      'Industroyer was designed to communicate directly with industrial control systems (ICS) using the same protocols that grid equipment understands. It could open circuit breakers, erase firmware, and disable safety mechanisms. In 2022, a successor variant called Industroyer2 was discovered targeting Ukrainian energy infrastructure again during the Russian invasion.',
      'The case is a foundational example of cyber-physical attacks, nation-state operations, and the vulnerability of critical infrastructure.'
    ],
    evidence: [
      {
        type: 'table',
        title: 'Attack Phases',
        headers: ['Phase', 'Action'],
        rows: [
          ['Reconnaissance', 'Mapped Ukrainian power-grid network'],
          ['Initial Access', 'Spear-phishing emails to utility employees'],
          ['Persistence', 'Installed backdoors and credential-harvesting tools'],
          ['Taking Action', 'Opened circuit breakers via ICS protocols'],
          ['Impact', 'Blackout affecting part of Kyiv']
        ]
      }
    ],
    glossary: [
      { en: 'ICS', zh: '工业控制系统', def: 'Industrial Control Systems: computers and devices that operate physical machinery, such as power grids, factories, and water treatment plants.' },
      { en: 'cyber-physical attack', zh: '网络物理攻击', def: 'A cyberattack that causes physical effects, such as stopping machinery or cutting power.' },
      { en: 'nation-state actor', zh: '国家背景行为体', def: 'An attacker acting on behalf of a government, often with significant resources and strategic goals.' }
    ],
    quiz: [
      {
        q: 'What made Industroyer particularly dangerous to critical infrastructure?',
        choices: ['It stole credit card numbers', 'It could speak the same protocols as grid equipment', 'It only worked on Windows XP', 'It spread through USB drives'],
        correct: 1,
        explain: 'Industroyer used ICS protocols to send commands directly to substation equipment, allowing it to open breakers and disrupt power.'
      }
    ],
    sources: [
      'https://www.welivesecurity.com/2017/06/12/industroyer-biggest-threat-industrial-control-systems-since-stuxnet/',
      'https://www.cisa.gov/news-events/cybersecurity-advisories/aa22-110a'
    ]
  },

  {
    id: 'signalgate',
    name: 'SignalGate',
    fullName: 'SignalGate — 2025 Government Group Chat Leak',
    tag: 'Unit 2 · OPSEC · Operational Security',
    color: '#8a7f8d',
    unit: 2,
    topic: '2.1G / 2.3',
    dilemma: 'Top officials used a consumer messaging app to plan a military strike. Is the risk the app, the behavior, or both?',
    body: [
      'In March 2025, reports revealed that senior U.S. national security officials had used Signal, an encrypted consumer messaging app, to coordinate details of a military operation. A journalist was accidentally added to the group chat, exposing sensitive planning information.',
      'SignalGate is not a cyberattack, but it is a valuable OPSEC (operational security) case for AP Cybersecurity. It illustrates how even strong encryption cannot protect information if the people using it fail to follow procedures for classified communication.',
      'The case contrasts sharply with breaches caused by external adversaries: here, the threat was misconfiguration of trust and process failure, not malware or hacking.'
    ],
    evidence: [
      {
        type: 'stats',
        title: 'Key Facts',
        stats: [
          { value: '2025', label: 'year' },
          { value: 'Consumer app', label: 'communication tool' },
          { value: 'Accidental', label: 'disclosure cause' },
          { value: 'OPSEC', label: 'core lesson' }
        ]
      }
    ],
    glossary: [
      { en: 'OPSEC', zh: '行动安全', def: 'Operational Security: practices that protect sensitive information by controlling how it is handled, stored, and shared.' },
      { en: 'end-to-end encryption', zh: '端到端加密', def: 'Encryption where only the communicating users can read messages, not even the service provider.' }
    ],
    quiz: [
      {
        q: 'Why is SignalGate an OPSEC case rather than a hacking case?',
        choices: ['The app was hacked', 'Information was exposed by human process failure, not technical intrusion', 'Signal has weak encryption', 'A nation-state stole the messages'],
        correct: 1,
        explain: 'The messages were protected by encryption, but poor operational security—adding the wrong person to a sensitive chat—led to the leak.'
      }
    ],
    sources: [
      'https://www.theatlantic.com/politics/archive/2025/03/signal-group-chat-leak/',
      'https://www.nytimes.com/2025/03/25/us/politics/signal-leak-explainer.html'
    ]
  },

  {
    id: 'change-healthcare',
    name: 'Change Healthcare',
    fullName: 'Change Healthcare Ransomware 2024',
    tag: 'Unit 1 · Risk · Healthcare',
    color: '#b85c5c',
    unit: 1,
    topic: '1.1–1.5',
    dilemma: 'When a single company handles one-third of U.S. patient records, how much risk is too much to concentrate in one place?',
    body: [
      'In February 2024, Change Healthcare, a UnitedHealth subsidiary that processes medical claims and prescriptions across the United States, was hit by a ransomware attack attributed to the ALPHV/BlackCat affiliate group.',
      'The attack disrupted pharmacies, hospitals, and clinics nationwide. Many providers could not verify insurance, process claims, or receive payments for weeks. The company later disclosed that personal health information for approximately 190 million people had been stolen.',
      'UnitedHealth reportedly paid a $22 million ransom, but attackers still leaked some data. The incident became a major case for understanding systemic risk, single points of failure, and the real-world consequences of ransomware on critical services.'
    ],
    evidence: [
      {
        type: 'stats',
        title: 'Impact',
        stats: [
          { value: '~190M', label: 'people affected' },
          { value: '$22M', label: 'reported ransom' },
          { value: 'Weeks', label: 'disruption to healthcare' },
          { value: '1/3', label: 'of U.S. patient records exposed' }
        ]
      }
    ],
    glossary: [
      { en: 'PHI', zh: '受保护健康信息', def: 'Protected Health Information: medical records and data that must be safeguarded under laws such as HIPAA in the United States.' },
      { en: 'single point of failure', zh: '单点故障', def: 'A component whose failure causes a much larger system to stop functioning.' }
    ],
    quiz: [
      {
        q: 'Why did the Change Healthcare attack have such a broad impact?',
        choices: ['It infected every hospital directly', 'Change Healthcare processed claims for a large share of the U.S. healthcare system', 'It used a worm that spread automatically', 'It destroyed all medical records'],
        correct: 1,
        explain: 'Change Healthcare was a centralized claims processor. Disrupting it affected pharmacies, clinics, and hospitals across the country.'
      }
    ],
    sources: [
      'https://www.hhs.gov/newsroom/news/2024/07/hhs-updates-change-healthcare-cyberattack-investigation.html',
      'https://www.bleepingcomputer.com/news/security/unitedhealth-change-healthcare-ransomware/'
    ]
  },

  {
    id: 'lastpass',
    name: 'LastPass',
    fullName: 'LastPass Vault Breach 2022',
    tag: 'Unit 5 · Identity · Password Managers',
    color: '#d4a045',
    unit: 5,
    topic: '5.1–5.6',
    dilemma: 'If the company that stores all your passwords is breached, where do you turn for safety?',
    body: [
      'In 2022, LastPass disclosed a series of security incidents. Attackers first compromised a developer’s laptop and stole source code. Later, they used information from that breach to access cloud backups containing customer password vaults.',
      'LastPass stated that the vaults were encrypted with users’ master passwords, so the data should be safe unless attackers could guess a master password. However, the breach still exposed vault metadata, website URLs, email addresses, and other unencrypted information.',
      'The case is a classic Unit 5 case for discussing trust models, encryption at rest, key derivation, multi-factor authentication, and the trade-offs of centralized password management. It asks students to think about who holds the keys to their digital identity.'
    ],
    evidence: [
      {
        type: 'table',
        title: 'What Was Exposed?',
        headers: ['Data Type', 'Encrypted?', 'Risk'],
        rows: [
          ['Password vault contents', 'Yes (with master password)', 'Crackable if master password is weak'],
          ['Website URLs in vault', 'No', 'Reveals account list and interests'],
          ['Email addresses', 'No', 'Enables targeted phishing'],
          ['Source code', 'Partially', 'Could help attackers find weaknesses']
        ]
      }
    ],
    glossary: [
      { en: 'password manager', zh: '密码管理器', def: 'Software that stores and generates passwords securely, usually protected by a single master password.' },
      { en: 'key derivation', zh: '密钥派生', def: 'A process that turns a human-readable password into a cryptographic key used for encryption.' },
      { en: 'multi-factor authentication', zh: '多因素认证', def: 'Requiring more than one piece of evidence to verify identity, such as a password plus a code from a phone.' }
    ],
    quiz: [
      {
        q: 'Why did LastPass say most vaults were still protected?',
        choices: ['They paid the ransom', 'Vault contents were encrypted with users’ master passwords', 'The breach was fake', 'They reset all passwords'],
        correct: 1,
        explain: 'LastPass relied on client-side encryption: the master password was needed to decrypt vault contents, so stolen backups remained encrypted.'
      }
    ],
    sources: [
      'https://blog.lastpass.com/2022/12/notice-of-recent-security-incident/',
      'https://www.cisa.gov/news-events/news/lastpass-data-breach'
    ]
  },

  {
    id: 'bandai-channel',
    name: 'Bandai Channel',
    fullName: 'Bandai Channel ChatGPT Attack 2025',
    tag: 'Unit 4 · Authentication · AI-Assisted Exploit',
    color: '#9b59b6',
    unit: 4,
    topic: '4.1–4.4 / 2.1B',
    dilemma: 'A teenager asked ChatGPT for help and cancelled 46,000 subscriptions. Is the bug, the bot, or the boy to blame?',
    body: [
      'In November 2025, a 15-year-old high school student in Saitama, Japan, exploited a flaw in Bandai Channel, a popular anime streaming service operated by Bandai Namco Filmworks. By analyzing the service’s network traffic, he discovered an authentication weakness that let him issue account-management commands without proper credentials.',
      'The student used ChatGPT to help write a program that sent false cancellation requests to Bandai Channel’s servers. Between 5 p.m. and 8:46 p.m. on November 4, the program cancelled 46,812 paid subscriptions. The platform suspended service on November 6 and remained offline for roughly a month while repairs were made.',
      'Bandai Namco later disclosed that personal information from up to 1.36 million accounts—including email addresses, account balances, and payment methods—may have been exposed. The company tried blocking the attacker’s IP address, but he evaded the blocks by changing his IP about 30 times.',
      'The student was first arrested in June 2026 on suspicion of unauthorized computer access and then re-arrested in July 2026 for obstruction of business. He told investigators he held no grudge against the company; he simply enjoyed analyzing network traffic and found the service vulnerable.',
      'The case is a compact example of how generative AI can accelerate exploitation, why authentication and input validation are critical, and why IP blocking alone is not enough to stop a determined attacker.'
    ],
    quotes: [
      {
        text: 'I created the source code for the withdrawal process myself. Since the processing was taking a long time, I asked ChatGPT and completed it in a different programming language.',
        who: 'Suspect statement to Tokyo Metropolitan Police, July 2026'
      }
    ],
    evidence: [
      {
        type: 'stats',
        title: 'Impact',
        stats: [
          { value: '46,812', label: 'subscriptions cancelled' },
          { value: '1.36M', label: 'accounts possibly exposed' },
          { value: '~1 month', label: 'service suspension' },
          { value: '~30', label: 'IP address changes' }
        ]
      },
      {
        type: 'table',
        title: 'AP Topic 4.2 — Authentication Failures',
        headers: ['Control', 'What went wrong'],
        rows: [
          ['Credential verification', 'Requests could trigger account actions without valid ID/password'],
          ['Session management', 'No strong session tokens or authorization checks on sensitive endpoints'],
          ['Input validation', 'Server accepted forged cancellation requests'],
          ['Rate limiting', 'Tens of thousands of cancellation requests were processed in hours'],
          ['Evasion control', 'IP blocks were bypassed by rotating addresses']
        ]
      },
      {
        type: 'table',
        title: 'Attack Chain',
        headers: ['Phase', 'Event'],
        rows: [
          ['Reconnaissance', 'Analyzed Bandai Channel network traffic'],
          ['Weaponization', 'Used ChatGPT to help build the cancellation program'],
          ['Exploitation', 'Sent forged requests via the authentication flaw'],
          ['Action', 'Cancelled 46,812 accounts'],
          ['Evasion', 'Changed IP ~30 times to avoid blocking']
        ]
      }
    ],
    glossary: [
      { en: 'authentication bypass', zh: '认证绕过', def: 'A vulnerability or technique that lets an attacker access a system or perform actions without providing valid credentials.' },
      { en: 'input validation', zh: '输入验证', def: 'Checking that data sent to a server is well-formed, expected, and authorized before processing it.' },
      { en: 'rate limiting', zh: '速率限制', def: 'Restricting how many requests a single user or IP can make in a given time to prevent abuse.' },
      { en: 'session management', zh: '会话管理', def: 'The processes that track authenticated users and enforce what they are allowed to do.' },
      { en: 'unauthorized access', zh: '未经授权访问', def: 'Gaining access to a system or data without permission.' },
      { en: 'generative AI', zh: '生成式人工智能', def: 'AI systems that can produce text, code, images, or other content based on prompts.' }
    ],
    quiz: [
      {
        q: 'What was the primary technical weakness exploited in the Bandai Channel attack?',
        choices: ['Weak user passwords', 'An authentication flaw allowing actions without valid credentials', 'A DDoS flood', 'A phishing email to employees'],
        correct: 1,
        explain: 'The student found an authentication/session flaw that let him send account-cancellation requests without proper credentials.'
      },
      {
        q: 'How did ChatGPT contribute to the incident?',
        choices: ['It discovered the vulnerability automatically', 'It helped rewrite/complete the cancellation program', 'It blocked the attacker’s IP address', 'It notified Bandai Namco of the breach'],
        correct: 1,
        explain: 'The suspect wrote the initial logic but used ChatGPT to complete the program in another language and speed up processing.'
      },
      {
        q: 'Why did blocking the attacker’s IP address fail?',
        choices: ['The attacker used a VPN and changed IPs repeatedly', 'The server had no firewall', 'The attacker stole admin credentials', 'The blocks were never applied'],
        correct: 0,
        explain: 'The student changed his IP address roughly 30 times, allowing him to continue sending cancellation requests.'
      },
      {
        q: 'Which AP Cybersecurity unit is the strongest fit for this case?',
        choices: ['Unit 1 only', 'Unit 2 only', 'Unit 4, with Unit 2 and Unit 5 angles', 'Unit 5 only'],
        correct: 2,
        explain: 'The core issue is authentication/software security (Unit 4), but it also involves adversary types (Unit 2) and legal/ethical questions (Unit 5).'
      }
    ],
    teaching: {
      hook: 'Ask students: “Have you ever asked ChatGPT to write code for you? What if that code could cancel 46,000 paid subscriptions in one evening?”',
      localization: 'Connect to Bilibili, Netflix, or Spotify account sharing. What would happen if a bug let anyone cancel your subscription or view your payment method?',
      posterLayout: 'Left: vulnerability chain (traffic analysis → auth bypass → mass deregistration). Right: defense checklist (strong auth, rate limiting, input validation, logging). Bottom: AI ethics triangle — tool, user, platform.',
      apAlignment: 'Primary: Unit 4.1 system vulnerabilities, 4.2 authentication/access control, 4.3 secure software design, 4.4 safe computing. Secondary: Unit 2.1B adversary types; Unit 5 legal/ethical implications.'
    },
    sources: [
      'https://mp.weixin.qq.com/s/xHxxkEWtdTb_D3hlUWOxQQ?scene=1',
      'https://www.asahi.com/ajw/articles/16703618',
      'https://www.japantimes.co.jp/news/2026/07/06/japan/crime-legal/boy-arrest-bandai-video/',
      'https://therecord.media/japanese-teen-arrested-over-attack-disrupted-streaming-service'
    ]
  }
];
