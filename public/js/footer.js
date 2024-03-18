const createFooter = () => {
    let footer = document.querySelector('footer');

    footer.innerHTML = `
        <div class="footer-content">
            <div class="footer-about" id="footer-about">
            
                <div class = "logo-slogan">
                
                    <img src="../img/light-logo.png" class="logo" alt="">
                    
                    <p class="slogan">Style in every click - <br>
                    your path to fashion</p>
                    <p><br></p>
<!--                    <p class="info">Support email: y.staroselskay@gmail.com</p>-->
                    <p class="info-email">Support email:  <a href="mailto:y.staroselskay@gmail.com?subject=YS Fashion: Visitor's question">y.staroselskay@gmail.com</a></p>
                    <p class="info-phone">Phone:  <a href="tel:+12025054107">+1 (202) xxx-xxx</a><br>(mobile, SMS available)</p>
                </div>
                
                <div class="footer-about-container">
                    <div class="about">
                        <p class="footer-title">About Company</p>
                                                
                        <p class="info"><br>
                        Welcome to 'YS Fashion', an educational E-Commerce initiative born as a student 
                         project dedicated to creating a website fueled by a passion for learning.</p>
                         
                        <p class="info">We take pride in our involvement in the Software QA community. 
                         Our products serve as a testing ground for the development of professional skills.</p>
                         
                        <p class="info">Join us on this educational journey.</p>
                    </div>
                </div>
            </div>
        </div>
<!--            <img src="../img/light-logo.png" class="logo" alt="">-->
<!--            <div class="footer-ul-container">               -->

<!--                <ul class="category">-->
<!--                    <li class="category-title">men</li>-->
<!--                    <li><a href="#" class="footer-link">t-shirts1</a></li>-->
<!--                    <li><a href="#" class="footer-link">t-shirts2</a></li>-->
<!--                    <li><a href="#" class="footer-link">t-shirts3</a></li>-->
<!--                    <li><a href="#" class="footer-link">t-shirts4</a></li>-->
<!--                    <li><a href="#" class="footer-link">t-shirts5</a></li>-->
<!--                    <li><a href="#" class="footer-link">t-shirts6</a></li>-->
<!--                    <li><a href="#" class="footer-link">t-shirts7</a></li>-->
<!--                    <li><a href="#" class="footer-link">t-shirts8</a></li>-->
<!--                    <li><a href="#" class="footer-link">t-shirts9</a></li>-->
<!--                    <li><a href="#" class="footer-link">t-shirts10</a></li>-->
<!--                </ul>-->

<!--                <ul class="category">-->
<!--                    <li class="category-title">women</li>-->
<!--                    <li><a href="#" class="footer-link">t-shirts1</a></li>-->
<!--                    <li><a href="#" class="footer-link">t-shirts2</a></li>-->
<!--                    <li><a href="#" class="footer-link">t-shirts3</a></li>-->
<!--                    <li><a href="#" class="footer-link">t-shirts4</a></li>-->
<!--                    <li><a href="#" class="footer-link">t-shirts5</a></li>-->
<!--                    <li><a href="#" class="footer-link">t-shirts6</a></li>-->
<!--                    <li><a href="#" class="footer-link">t-shirts7</a></li>-->
<!--                    <li><a href="#" class="footer-link">t-shirts8</a></li>-->
<!--                    <li><a href="#" class="footer-link">t-shirts9</a></li>-->
<!--                    <li><a href="#" class="footer-link">t-shirts10</a></li>-->
<!--                </ul>-->

<!--            </div>-->
     
        
       

<!--        <p class="footer-title">About Company</p>-->
<!--        <p class="info"><b>Style in every click - your path to fashion!</b><br>The online store "YS Fashion" is a student project dedicated to creating a website, fueled by a passion for learning. We take pride in being a part of the Software QA community. Our products serve as a testing ground for the development of professional skills. Join us!</p>-->
<!--        -->
       
        
<!--        <div>-->
<!--            <p class="info">Support email: y.staroselskay@gmail.com</p>-->
<!--            <p class="info">Telephone: +1 (202) xxx-xxx</p>-->
<!--        </div>-->

        <div class="footer-social-container">
            <div>
                <a href="/" class="social-link">home</a>
                <a href="#" class="social-link">terms & services</a>
                <a href="#" class="social-link">privacy page</a>
            </div>
            <div>
                <a href="https://www.linkedin.com/in/yelenastaroselskaya" class="social-link" target=”_blank”>LinkedIn</a>
                <a href="#" class="social-link" target=”_blank”>GitHub Code</a>
                <a href="https://github.com/ystaros/ECommerceTests" class="social-link" target=”_blank”>GitHub Test</a>
            </div>
        </div>
        <p class="footer-credit">Style, Click, Repeat - Your Fashion Ritual in Every Click.</p>
    
    `;

}

createFooter();


