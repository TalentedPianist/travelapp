
<style>
    p { 
        font-size: x-large;
    }
    
    section { 
        display: flex;
        flex-direction: row;
        flex: 1;
        align-items: flex-start;
        width: '100%';
        justify-content: space-evenly;
    }

    article { 
        width: 50%;
        
    }

    img { 
        width: 100%;
        vertical-align: top;
    }

    div { 
        background-color: orange;
        min-height: 100%;
        padding-left: 1%;
        padding-right: 1%;
        padding-top: 1%;
        padding-bottom: 1%;
    }

    li { 
        font-size: x-large;
    }

    .ol { 
        display: flex;
        flex-direction: row;
    }

    .homepage ol { 
        display: flex; 
        flex-direction: row;
        flex: 1;
        align-items: flex-start;
        gap: 2em;
    }

    .homepage li { 
        align-self: flex-start;
    }

    .aboutpage { 
        gap: 2em;
    }
    .registerpage { 
        gap: 2em;
    }

    .profilepicture { 
        display: flex;
        flex-direction: column;
        flex: 1;
        width: 100%;
        justify-content: space-evenly;
    }

    .profilepicture ol { 
        display: flex;
        flex-direction: row;
        flex: 1;
        justify-content: space-evenly;
        min-width: 100%;
        gap: 5em;
    }

    .location { 
        display: flex;
        flex-direction: column;
        flex: 1;
        width: 100%;
        justify-content: space-evenly;
    }

    .location ol { 
        display: flex; 
        flex-direction: row; 
        flex: 1; 
        justify-content: space-evenly;
        min-width: 100%;
        gap: 5em;
    }

    .delete { 
        display: flex; 
        flex-direction: column;
        flex: 1; 
        width: 100%;
        
    }

    .delete ol { 
        display: flex;
        flex-direction: row;
        flex: 1;
        justify-content: space-evenly;
        min-width: 100%;
        gap: 5em;
    }
    </style>

<div>

<h1>My Travel App</h1>

<p>This repository contains a travel app that was created as part of my course at University of the West of Scotland.  To install the app on your device, please follow these steps:</p>

<ol>
    <li>Visit the link <a href="https://expo.dev/preview/update?message=Final%20changes!!&updateRuntimeVersion=1.0.0&createdAt=2025-04-22T05%3A29%3A44.194Z&slug=exp&projectId=105e583f-b44d-4c4b-9405-2a0c949ed441&group=e4f63c2e-2c32-461e-a98e-f845b86a5440" target="_blank">here</a>.</li>
    <li>Use your camera on your phone to scan the QR code, which will allow you to preview the app on your device.</li>
    <li>If you are an advanced user, you can click <b>Advanced</b> and choose the development environment you wish to run.</li>
    <li>For this project, it is preferrable to choose Expo Go for the environment.</li>
</ol>

<hr>

<section>
    <article>
        <p>For Expo Go, you should see the web page illustrated on the right.</p>
    </article>
    <article>
        <img src="images/expo-link.png">
    </article>
</section>

<section>
    <p>Now you will find more detailed instructions of how to use the app below.</p>
</section>

<hr>
<h3>Home Page</h3>
<section class="homepage">
    <div>
        <ol>
        <li><a href="images/search-form-dropdownlist-screenshot.png" target="_blank"><img src="images/search-form-dropdownlist-screenshot.png"></a></li>
        <li><a href="images/hotels-list-screenshot.png"><img src="images/hotels-list-screenshot.png"></a></li>
        <li><a href="images/hotel-modal-popup-screenshot.png" target="_blank"><img src="images/hotel-modal-popup-screenshot.png"></a></li>
        <li><a href="images/home-page-after-saved-hotel.png" target="_blank"><img src="images/home-page-after-saved-hotel.png"></a>
        </ol></li>
    </div>
</section>

<hr>
<h3>About Us</h3>
<section class="aboutpage">
    <article>
        <img src="images/about-us-page.png">
    </article>
    <article>
        <p>The about us page is very generic, with lots of room for improvement.  It simply contains lorem ipsum generated text inside a scroll view.  It should be remembered that this app is a school project and will not necessarily be published.</p>
    </article>
</section>

<section class="registerpage">
    <article>
        <p>The register page attempts to improve the user interface design ever so slightly by adding icons to the input fields.  It is a standard registration page that validates user input and creates a new user account.  It should be noted that mobile development is very different to web development, so only one user can be created.</p>
    </article>
    <article>
        <img src="images/register-page.png">
    </article>

</section>

<hr>
<h1>Login Page</h1>
<section class="login-page">
    <article>
        <img src="images/login-screenshot.png">
    </article>
    <article>
        <p>Again, the login page has a very basic user interface with a simple login form to enter your email address and password.  The interface could be vastly improved by adding a link to reset your password.</p>
    </article>
</section>


<h1>Profile Page</h1>
<section class="profile-page">
    <article>
        <p>After the user successfully logs in, they will be redirected to ther profile page.  This demonstrates basic read functionality in the application.  It could be made more engaging to improve it, but time has been a big constraint for this project.</p>
        <p>Navigation tabs have been created at the bottom to navigate around the profile section.  This is popular on mobile apps, notably the Facebook mobile app has this UI design.</p>
        <p>The navigation tabs are:</p>
        <ul>
            <li>Profile</li>
            <li>Update Profile</li>
            <li>Profile Picture</li>
            <li>Add Location</li>
            <li>Delete Profile</li>
        </ul>
        <p>This guide will now go on to describe the Update Profile screen.</p>
    </article>
   <article>
        <img src="images/profile-home.png">
    </article>
</section>


<h1>Update Profile</h1>
<section>
    <article>
        <img src="images/update-profile.png">
    </article>
    <article>
        <p>The update profile screen demonstrates update functionality of CRUD operations.  It consists of really basic input fields to update your name and email address.  Attempts to improve the user interface experience have been added by clearing the field when the user touches it.</p>
    </article>
</section>

<hr>
<h1>Profile Picture</h1>
 <section class="profilepicture">
    <div>
    <ol>
        <li><a href="images/camera-screenshot-1.png"><img src="images/camera-screenshot-1.png"></a></li>
        <li><a href="images/camera-screenshot-2.png"><img src="images/camera-screenshot-2.png"></a></li>
        <li><a href="images/camera-screenshot-3.png"><img src="images/camera-screenshot-3.png"></a></li>
    </ol>
    </div>
    <div>
        <ol start="4">
            <li><a href="images/camera-screenshot-4.png"><img src="images/camera-screenshot-4.png"></a></li>
            <li><a href="images/camera-screenshot-5.png"><img src="images/camera-screenshot-5.png"></a></li>
            <li><a href="images/camera-screenshot-6.png"><img src="images/camera-screenshot-6.png"></a></li>
        </ol>
    </div>
</section>

<h1>Add Location</h1>
<section class="location">
    <div>
        <ol>
            <li><a href="images/location-screenshot-1.png"><img src="images/location-screenshot-1.png"></a></li>
            <li><a href="images/location-screenshot-2.png"><img src="images/location-screenshot-2.png"></a></li>
            <li><a href="images/location-screenshot-3.png"><img src="images/location-screenshot-3.png"></a></li>
        </ol>
    </div>
</section>

<h1>Delete Profile</h1>
<section class="delete">
        <ol>
            <li><a href="images/delete-profile-1.png"><img src="images/delete-profile-1.png"></a></li>
            <li><a href="images/delete-profile-2.png"><img src="images/delete-profile-2.png"></a></li>
            <li><a href="images/delete-profile-3.png"><img src="images/delete-profile-3.png"></a></li>
        </ol>
    
</section>


</div>