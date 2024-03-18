const createFooter = () => {
    let footer = document.querySelector('footer');

    footer.innerHTML = `
        <div class="footer-content" id="footer-about">
            <img src="../img/light-logo.png" class="logo" alt="">
            <div class="footer-ul-container">               

                <ul class="category">
                    <li class="category-title">men</li>
                    <li><a href="#" class="footer-link">t-shirts1</a></li>
                    <li><a href="#" class="footer-link">t-shirts2</a></li>
                    <li><a href="#" class="footer-link">t-shirts3</a></li>
                    <li><a href="#" class="footer-link">t-shirts4</a></li>
                    <li><a href="#" class="footer-link">t-shirts5</a></li>
                    <li><a href="#" class="footer-link">t-shirts6</a></li>
                    <li><a href="#" class="footer-link">t-shirts7</a></li>
                    <li><a href="#" class="footer-link">t-shirts8</a></li>
                    <li><a href="#" class="footer-link">t-shirts9</a></li>
                    <li><a href="#" class="footer-link">t-shirts10</a></li>
                </ul>

                <ul class="category">
                    <li class="category-title">women</li>
                    <li><a href="#" class="footer-link">t-shirts1</a></li>
                    <li><a href="#" class="footer-link">t-shirts2</a></li>
                    <li><a href="#" class="footer-link">t-shirts3</a></li>
                    <li><a href="#" class="footer-link">t-shirts4</a></li>
                    <li><a href="#" class="footer-link">t-shirts5</a></li>
                    <li><a href="#" class="footer-link">t-shirts6</a></li>
                    <li><a href="#" class="footer-link">t-shirts7</a></li>
                    <li><a href="#" class="footer-link">t-shirts8</a></li>
                    <li><a href="#" class="footer-link">t-shirts9</a></li>
                    <li><a href="#" class="footer-link">t-shirts10</a></li>
                </ul>

            </div>
        </div>

        <p class="footer-title">About Company</p>
        <p class="info"><b>Style in every click - your path to fashion!</b><br>The online store "YS Fashion" is a student project dedicated to creating a website, fueled by a passion for learning. We take pride in being a part of the Software QA community. Our products serve as a testing ground for the development of professional skills. Join us!</p>
        <p class="info">Support email: y.staroselskay@gmail.com</p>
        <p class="info">Telephone: +1 (202) xxx-xxx</p>

        <div class="footer-social-container">
            <div>
                <a href="#" class="social-link">terms & services</a>
                <a href="#" class="social-link">privacy page</a>
            </div>
            <div>
                <a href="#" class="social-link">instagram</a>
                <a href="#" class="social-link">facebook</a>
                <a href="#" class="social-link">twitter</a>
            </div>
        </div>
        <p class="footer-credit">Clothing, the best apparel online store.</p>
    
    `;

}

createFooter();


