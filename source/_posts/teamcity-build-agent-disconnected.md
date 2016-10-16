title: TeamCity – Build agent disconnected
date: 2016-09-07 06:49:01
tags:
  - TeamCity
---

Bellow is how I resolve my problem with TeamCity – Build agent disconnected.

![TeamCity Agent Disconected](/images/teamcity-agent-disconnected.png)

- ssh to my centos agent machine.
- Go to agent folder, in this case it is `BuildAgent`
- I tried to stop the agent by `bin/agent.sh stop` but got no luck. When I started the agent it said that `Build agent is already running with PID 1795`, so that I could not restart it.
- KILL the process by `sudo kill 1795`
- Restart again `bin/agent.sh start`
=> It should work now.