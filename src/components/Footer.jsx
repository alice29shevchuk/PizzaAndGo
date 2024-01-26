import React from 'react';

const Footer = () => {
    const handleBackToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  return (
    <footer className="Footer_footer__OYoYH">
    <div className="container">
        <div className="FooterTop_top__heUwq">
            <span>
                <img src="https://pizzaday.eatery.club/storage/pizzaday/setting/image/14577/bc640ba93e386def70837d2cd28cc7b3.jpg" className="Logo_logo__5xyYV" height="72" alt="Pizza Day" />
            </span>
            <button onClick={handleBackToTop} className='buttonBackToTop'>&#9650;</button>
        </div>
        <div className="FooterBodyDesktop_body__7IbXM">
            <div>
                <div className="FooterBodyDesktop_bodyLeft__ozKR1">
                    <div className="FooterBodyBlock_bodyBlock__DUO99">
                        <p className="FooterBodyBlock_title__mwURC">Pizza Day</p>
                        <nav className="FooterNav_navLinks__2fLr3">
                            <a className="FooterNav_navLink__qa4x6" href="http://work.pizzaday.com.ua/" target="_blank" rel="noreferrer">Робота</a>
                            <a className="FooterNav_navLink__qa4x6" href="https://docs.google.com/forms/d/e/1FAIpQLSfniJwUBsiDFVnkWl7bHv4Sbv2tuirK2tVR_wXifr4pZHCKug/viewform" target="_blank" rel="noreferrer">Постачальникам</a><a className="FooterNav_navLink__qa4x6" href="tel:800 33 44 55" target="" rel="noreferrer">Гаряча лінія - 800 33 44 55</a><a className="FooterNav_navLink__qa4x6" href="mailto:manager@pizzaday.com.ua" target="" rel="noreferrer">manager@pizzaday.com.ua</a><a className="FooterNav_navLink__qa4x6" href="/about-us">Про нас</a>
                        </nav>
                    </div>
                    <div className="FooterBodyBlock_bodyBlock__DUO99">
                        <p className="FooterBodyBlock_title__mwURC">Самовивіз</p>
                        <div className="FooterDelivery_delivery__pes25">
                            <div className="TimeStatus_timeStatus__z2fdv FooterDelivery_workingTime__ys_5s TimeStatus_active__RAH7I"><span className="TimeStatus_indicator__r_Lrk"></span>Відкрито з 10:00 до 22:00</div>
                            <ul className="FooterDelivery_telephones__6XReI">
                                <li className="FooterDelivery_telephone__p2B7a"><a href="tel:0800334455">0 800 334 455</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="FooterDelivery_cardsWrapper__dPgOx">
                        <div className="CreditCards_cards___UTKD">
                            <img src="https://www.pizzaday.com.ua/_next/static/media/MasterCard.7400487e.png" className="CreditCards_card__3HMiK" width="50" height="32" alt="MasterCard" />
                            <img src="https://www.pizzaday.com.ua/_next/static/media/Visa.e1fe40e5.png" className="CreditCards_card__3HMiK" width="50" height="32" alt="Visa" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="FooterBottomDesktop_bottom__emi2i">
            <p className="FooterBottomDesktop_copyright__azWrg">© 2024 Pizza Day.</p>
            <ul className="FooterBottomLinks_bottomLinks__R_JJd">
                <li className="FooterBottomLinks_bottomLink__yBAmE"><a href="https://www.eatery.club/privacy_policy.pdf" target="_blank">Політики конфіденційності і обробка персональних даних</a></li>
            </ul>
            <div className="FooterBodyDesktop_bodyRight__1x7wK">
                <div className="Socials_socials__cEmAe"><a className="Socials_socialLink__AUZ05" href="https://www.facebook.com/pizzaday.ua/" target="_blank" rel="noopener noreferrer"><svg className="Socials_icon__HXVZS" width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.19709 16V8.71351H7.56641L7.9186 5.86062H5.19709V4.04344C5.19709 3.2202 5.41817 2.65655 6.55698 2.65655H8V0.11304C7.2982 0.0348056 6.59212 -0.00253377 5.88603 0.000133321C3.79177 0.000133321 2.3539 1.32657 2.3539 3.76162V5.85528H0V8.70818H2.35904V16H5.19709Z"></path>
                        </svg></a><a className="Socials_socialLink__AUZ05" href="https://www.instagram.com/pizzaday.ua/" target="_blank" rel="noopener noreferrer"><svg className="Socials_icon__HXVZS" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M4.49573 0H13.5043C15.9872 0 18 2.01243 18 4.49573V13.5043C18 15.9872 15.9876 18 13.5043 18H4.49573C2.01281 18 0 15.9876 0 13.5043V4.49573C0 2.01281 2.01243 0 4.49573 0ZM1.8 13.5043C1.8 14.9933 3.00677 16.2 4.49573 16.2H13.5043C14.9933 16.2 16.2 14.9932 16.2 13.5043V4.49573C16.2 3.0067 14.9932 1.8 13.5043 1.8H4.49573C3.0067 1.8 1.8 3.00677 1.8 4.49573V13.5043ZM4.5 9C4.5 6.51472 6.51472 4.5 9 4.5C11.4853 4.5 13.5 6.51472 13.5 9C13.5 11.4853 11.4853 13.5 9 13.5C6.51472 13.5 4.5 11.4853 4.5 9ZM11.7 9C11.7 7.50883 10.4912 6.3 9 6.3C7.50883 6.3 6.3 7.50883 6.3 9C6.3 10.4912 7.50883 11.7 9 11.7C10.4912 11.7 11.7 10.4912 11.7 9ZM13.5 5.4C13.9971 5.4 14.4 4.99706 14.4 4.5C14.4 4.00294 13.9971 3.6 13.5 3.6C13.0029 3.6 12.6 4.00294 12.6 4.5C12.6 4.99706 13.0029 5.4 13.5 5.4Z"></path>
                        </svg></a><a className="Socials_socialLink__AUZ05" href="https://www.tiktok.com/@pizzaday.ua?" target="_blank" rel="noopener noreferrer"><svg className="Socials_icon__HXVZS" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.0075 3.63569C13.8829 3.57639 13.7616 3.51138 13.6441 3.44091C13.3023 3.23283 12.9889 2.98765 12.7107 2.71066C12.0146 1.97721 11.7547 1.23315 11.6589 0.712194H11.6627C11.5827 0.279778 11.6158 0 11.6208 0H8.45036V11.2896C8.45036 11.4411 8.45036 11.5909 8.44344 11.739C8.44344 11.7574 8.44152 11.7744 8.44036 11.7942C8.44036 11.8024 8.44036 11.8109 8.43844 11.8194C8.43844 11.8215 8.43844 11.8236 8.43844 11.8257C8.40502 12.2308 8.26402 12.6221 8.02783 12.9652C7.79165 13.3083 7.46752 13.5927 7.08396 13.7934C6.68421 14.0028 6.23208 14.1127 5.77217 14.1121C4.295 14.1121 3.09781 13.0029 3.09781 11.6331C3.09781 10.2632 4.295 9.15404 5.77217 9.15404C6.05179 9.1538 6.32968 9.19432 6.59555 9.2741L6.59939 6.30137C5.7923 6.20537 4.97237 6.26444 4.19131 6.47485C3.41025 6.68526 2.68502 7.04246 2.06138 7.5239C1.51492 7.96113 1.05551 8.48282 0.70382 9.06551C0.569987 9.278 0.0650366 10.1318 0.00388879 11.5176C-0.0345689 12.3042 0.221944 13.1191 0.34424 13.4559V13.463C0.421155 13.6613 0.719203 14.3381 1.20492 14.9086C1.59659 15.3663 2.05933 15.7683 2.57825 16.1017V16.0947L2.58594 16.1017C4.12079 17.0622 5.82255 16.9992 5.82255 16.9992C6.11713 16.9882 7.10396 16.9992 8.22462 16.5101C9.46757 15.9679 10.1752 15.1601 10.1752 15.1601C10.6273 14.6774 10.9867 14.1273 11.2382 13.5335C11.5251 12.839 11.6208 12.006 11.6208 11.6731V5.68374C11.6593 5.70499 12.1715 6.01699 12.1715 6.01699C12.1715 6.01699 12.9095 6.4526 14.061 6.73627C14.887 6.93813 16 6.98063 16 6.98063V4.08228C15.61 4.12123 14.8182 4.0079 14.0075 3.63569Z"></path>
                        </svg></a>
                </div>
            </div>
        </div>
    </div>
</footer>
  );
};

export default Footer;
