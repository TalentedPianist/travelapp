
<style>
    p { 
        font-size: large;
    }
    
    section { 
        display: flex;
        flex-direction: row;
        flex: 1;
        align-items: flex-start;
        width: '100%';
        gap: 2em;
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


</div>