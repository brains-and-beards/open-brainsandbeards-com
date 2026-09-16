# Case study: Vay

##### Creating a customer-facing mobile app for remote controlled cars in Las Vegas.

[PICS here] - maybe from the [App Store](https://apps.apple.com/us/app/vay-rent-a-car-by-the-minute/id6466818242)?

Vay is a car-sharing company with a modern twist: their vehicles are capable of being remotely controlled, and a customer can order one to be delivered in a semi-autonomous manner right to their door. The customers pay per minute of rental and per kilometer driven, like in a classic car sharing setup. Upon returning the vehicle, you can request the remote driver to take over once more, allowing the user to hop out of the car at the destination without worrying about finding a long-term parking space.

Our role was to develop the front-end for the customers: a mobile app which would allow them to find or book the right vehicle, book it, and unlock it upon delivery. The users were also able to inspect the areas in which teledriving was available, as well as possible places for ending their ride, and perform all actions from booking to payment, necessary to complete the trip.

## Challenges

Most of the difficulties concerning this project stemmed from its size and the level of technical complexity. Contrary to most of our other projects, this one didn't have the feeling of working in a startup anymore, but rather a mid-size enterprise.

- First of all, the sheer number of various teams engaged in the project (even just from the engineering perspective) required a very high degree of collaboration in order for everyone to understand each other's work.
- Another important factor was that while the majority of engineers were based in Europe, the service actually operated only in Las Vegas, which sometimes hampered the communication due to the Europe-US time zone difference.
- Due to the remote-controlled nature of the project, connectivity was a topic of special attention. An important part of Brains&Beards' input to the project consisted of integrating the mobile app with an hardware device on board of the vehicle using Bluetooth.

## Process

Various Brains & Beards members have taken part in this project over the last 8 years - each with their own lifestyle and work habits. Nevertheless, the challenges of the project led to some solutions which we all shared to make sure our work was productive.

#### Cross-team collaboration

The whole process, in order to work smoothly, required cooperation of multiple teams. Let's pause for a moment and consider the typical example of an end user requesting a vehicle to be delivered to their location:

- First, the user would book a trip inside the mobile app. This part was developed by the Mobile team, which consisted of (or at least consistently included) Brains & Beards members since 2018.
- The app would send a request to the so-called Rider API - an intermediate REST server handled in Node.js (also maintained by the Mobile team).
- The API would in turn fetch the required data from the backend via a gRPC call inside a company VPN (the servers were handled by the Backend engineers).
- Backend itself consisted of several subsystems, which handled the user bookings, fleet state, routing, and also tackled many other issues such as rebalancing (dispatching free cars into higher-demand districts)
- Once the vehicle delivery started, the car was operated remotely by one of the Teledrivers, and monitored using a Telematics Service (which also had its own team of engineers).
- The teledriving shift managers were able to monitor the status of the vehicles and trips using a separate web tool called Mission Control (which our company members took part in creating as well).

The result of this multi-stage setup was that, from time to time, we had to do cross-system debugging, for example by inspecting logs from the API and multiple servers on the backend side, in order to pinpoint a bug in the mobile app.

And this is just the engineering side of things! In reality, the final product required much wider cooperation, ranging from designers (Product / UX) to final operational teams like Customer Support or Field Support Agents who would clean and recharge vehicles after use. In order to keep the mobile app functioning well, we had listen to the feedback not only from the end users and our direct supervisors, but also from the members of other teams.

Because of this, whenever a new feature was being discussed, a major task was communicating across various teams (usually - but not only - with the backend engineers and the product owners) to work out the exact requirements and decide what kind of data structures need to be involved. Due to the technical nature of this task, it could not be handled purely by the management, since we had to take into account the capabilities and limitations of all the systems involved. This was often the most time-consuming part of the development work!

The amount of collaboration involved led us to working in slightly different ways than in other projects. While we retained the classic practices of Agile development (standups, retros, sprint planning, and tracking the workflow in JIRA), we kept these restricted to the mobile team only. However, there were also many impromptu quick calls or Slack conversations with other teams. In order not to lose track of the agreements, we put emphasis on documenting as much of the arrangements as possible.

The main premise was that every major feature that involved more than one team had to be accompanied by a proper Architecture Decision Record (ADR) which everyone could refer to. The process was quite "democratic" - not only because could anyone contribute by commenting on these documents, but also thanks to our team members taking turns on par with the team leaders in writing the first drafts of the ADRs and exploring various architectural options.

#### Time zone difference

Vay's car-sharing business developed in Las Vegas due to favorable local laws regarding driverless vehicles. The engineering teams, however, stayed mostly in Berlin, which caused delays in communication.

In this case, Brains&Beards' work style was a great fit. Working remotely on a daily basis had already made our team experts in asynchronous communication. It was perfectly natural for us to describe problems in a thorough and clear manner which allowed the other person to provide all the necessary information in a single move, without lengthy back-and-forth discussions. Flexible working hours mean that it was also not uncommon for us to dedicate a few minutes in the evening in order to get priorities straight for the next workday.

#### Hardware integration

The heart of the project, which made it stand out against other car-sharing services, was the special teledriving hardware, which was installed in the cars. It was usually enough for the vehicle to respond to commands issued from the servers, but it turned out there was one crucial exception: unlocking the vehicle doors.

Vay's cars were only allowed to be teledriven along the streets with good signal coverage. In order to maximize their delivery range, the company equipped them with a special device containing multiple SIM cards from different providers, automatically choosing the best one in a particular spot. The customers, however, had to rely only on their own telecommunications company, which often led to a situation where the car was connected to the Internet but the user wasn't. This often led to a frustrating user experience: the customer reached the car but was in an area with poor or missing Internet connection, and hence unable to reach the server which could order the car to open the doors.

The solution was simple: let the app "speak" directly to the vehicle over a Bluetooth Low Energy (BLE) connection. However, the execution was harder than it seemed, as the hardware was built into the cars and not readily available to us as external, remote developers. We had to rely, once again, on very detailed documentation in order to make the mobile application compatible with the on-board hardware. Apart from communicating with the devices itself, we also had to consider multiple alternative scenarios regarding the user not allowing Bluetooth connections, having BT turned off, as well as intermittent to connection failures over longer distances.

After the Bluetooth interface in the mobile app was ready, the final integration tests were carried out in specially designated vehicles on the Tegel airport grounds. The feature was launched 2 years ago, and has been the cornerstone of handling poor connectivity issues for users since then.

#### Mobile app programming

Apart from being complex in terms of communication and hardware-integration, Vay also had a number of challenges related simply to being a mobile app. A couple of interesting topics resolved within the mobile team included:

- Determining which data in the app should be hard-coded and which could be moved to the Rider API for easier deployments
- Optimizing the maps, visible at most stages of the trip: preventing unnecessary re-renders, and using map tiles to prevent UI freezes when zooming the map. You can read more on this topic in Szymon's blogpost here: https://brainsandbeards.com/blog/2024-boosting-map-vay/ .
- Obtaining real-time state updates from the backend server via websockets for showing live vehicle position updates, their expected delivery routes, etc.
- Extending the project to the Android platform (this was fairly easy thanks to the React Native architecture)
- Creating automated app tests using Maestro (with simulator screenshots being taken automatically during each test step)

### Conclusion

Taking part in Vay's journey from a rough prototype app to a fully functional innovative product has been a very interesting experience for us, both from the technical and organizational points of view. Currently (autumn 2026), their app has a consistent rating of 4.8 stars in both Google Play and App Store. I guess we can be proud!
