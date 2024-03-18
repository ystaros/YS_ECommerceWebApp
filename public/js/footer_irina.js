const createFooter = () => {
    let footer = document.querySelector('footer');

    footer.innerHTML = `
    <div class="footer-content">
        <div class="footer-about" id="footer">
        
            <div class = "logo-slogan">
                <img src="../img/light-logo.png" class="logo" alt="">
                
                <p class="slogan">Style in every click</p>
            </div>
            
            <div class="footer-about-container">
            
                <div class="about">
                    <p class="footer-title">About Company</p>
                    
<!--                     <p class="info"><b>Style in every click - your path to fashion!</b></p>-->
                     <p class="info"><b>STYLE IN EVERY CLICK - YOUR PATH TO FASHION!</b></p>
                     
                     <p class="info">Welcome to 'YS Fashion,' an educational E-Commerce initiative born as a student 
                     project dedicated to creating a website fueled by a passion for learning.</p>
                     
                     <p class="info">We take pride in our involvement in the Software QA community. 
                     Our products serve as a testing ground for the development of professional skills.</p>
                     
                     <p class="info">Join us on this educational journey.</p>
                            
                </div>
            </div>
        </div>


        <div class="footer-info-container">
            <ul class="contact-info">
                <li class="contact-info-title">Terms & Privacy:</li>
                <li><a href="#" class="contact-info-link">Terms & Services</a></li>
                <li><a href="#" class="contact-info-link">Privacy Policy</a></li>
            </ul>
            <ul class="contact-info">
                <li class="contact-info-title">Support Emails:</li>
                <li><a href="#" class="contact-info-link">help@ajshop.com</a></li>
                <li><a href="#" class="contact-info-link">support@ajshop.com</a></li>
            </ul>
            <ul class="contact-info">
                <li class="contact-info-title">Phones:</li>
                <li><a href="#" class="contact-info-link">1(800)1-AJSHOP</a></li>
                <li><a href="#" class="contact-info-link">1(800)111-2211</a></li>
            </ul>
            <ul class="contact-info">
                <li class="contact-info-title">Follow us:</li>
                <li><a href="#" class="contact-info-link">Instagram</a></li>
                <li><a href="#" class="contact-info-link">Twitter</a></li>
            </ul>
        </div>
    </div>
<!--    <div class="footer-bottom">-->
<!--        <br>-->
<!--    </div>-->
    `;
}

createFooter();