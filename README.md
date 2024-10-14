Project Overview
This project showcases a full-stack web application inspired by Booking.com, where users can browse properties,
make reservations, and interact with property listings. The application offers a smooth and dynamic user experience,
integrating a robust backend built with Django and a responsive frontend powered by Next.js and Tailwind CSS.

Backend - Django with RESTful API
Developed the backend using Django with a RESTful API, ensuring seamless data handling and user interactions.
Implemented JWT-based authentication, enabling secure user registration, login, logout, and profile management.
Utilized SQLite for data storage, managing property listings, user data, reservations, and comments.
Designed the data model to link each property with a landlord, ensuring logical property management.
Added features for users to leave comments on properties. Logged-in users have the ability to create,
edit, and delete their own comments, providing full control over their contributions.

Frontend - Next.js & Tailwind CSS
Developed a dynamic and responsive frontend using Next.js (App Router) for enhanced navigation and user experience.
Styled the application using Tailwind CSS, providing a sleek and modern UI.
Integrated TypeScript for type safety, ensuring code quality and reducing potential bugs.
Leveraged Zustand for efficient state management across the application.
Core Features
Property Listings: Logged-in users can add new properties, including uploading multiple images.
Each property is associated with a landlord. Filtering System: Users can filter properties by location, available dates, 
number of guests, and specific categories to find exactly what they need.
Favorite Properties: Users can "like" properties, with their favorites accessible on a dedicated page for easy reference.
Comments: Users can leave, edit, or delete comments on property listings, providing an interactive experience. 
Comment editing and deletion are restricted to the comment's creator.
Reservations: Users can book available properties and view their reservation history. 
The system ensures that reservations cannot be made on dates when properties are already reserved.
Profile Management: Users can upload profile photos and access a detailed list of their owned properties and reservations.

Technical Highlights
Full JWT-based authentication for secure user management.
SQLite database for structured storage of properties, users, comments, and reservations.
Next.js and Tailwind CSS for a smooth, responsive UI experience.
Zustand for managing state across the app, ensuring optimal performance and responsiveness.
Built-in features for property management, user interaction, and reservation control, offering a comprehensive platform for both landlords and guests.


  Note: You can preview the application in action by watching the demo video uploaded to this GitHub repository.
