const headerTemplate = document.createElement('template');
headerTemplate.innerHTML = `
    <style>
        * {
            font-size: 14px;
            font-family: Roboto, sans-serif;
        }

        a {
            text-decoration: none;
            color: inherit;
        }

        header nav ul {
            display: flex;
            justify-content: center;
            align-items: center;
            text-transform: uppercase;
            list-style: none;
            padding: 0;
            color:rgb(103, 102, 102)
        }
        
        header li{    
            display: block;
            font-size: 14px;
            font-weight: 700;
            line-height: 1.35em;
            /* width: 100%; */
        }
        
        header li a {
            display: block;
            padding: 0 20px;
            border-right: 1px solid #7b9ebf;
            /* color: rgb(103, 102, 102); */
        }
        
        header li a:hover {
            color: #b00;        
        }
        
        header ul li {
            position: relative;
            cursor: pointer;
        }
        
        header ul li.active::after {
            background-color: rgb(119, 177, 96);
            position: absolute;
            display: block;
            content: '';
            top: 26px;
            height: 4px;
            width: 100%;
            opacity: .7;
        }
        
        .header {
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            /* box-shadow: 0px 0px 15px 0px rgb(0 0 0 / 25%); */
        }
        
        .headerTop {
            font-size: 20px;
            font-weight: 300;
            color: white;
            height: 30px;
            background-color:#b00;
            text-align: center;
        }
        
        .headerMiddle {
            font-size: 35px;
            font-weight: 100;
            height: 40px;
            margin-left: auto;
            margin-right: auto;
            text-align: center;    
        }
        
        .headerMiddle:hover {
            color: rgb(48, 4, 151);
        }
        
        .headerNav {
            font-size: 20px;
        }
        
        .menuIcon {
            width: 40px;
            height: 40px;
            display: none;
        }
        
        .shortmenu {
            width: 40px;
            height: 40px;
        }
        
        .menu {
            width: 100%;
            height: 260px;
            background-color: rgb(29, 65, 228);
            opacity: .8;
            z-index: 10;
            position: fixed;
            top: 0px;
            right: 0px;
            display:none;
        }
        
        .menu div {
            line-height: 40px;
            padding-top: 0px;
            text-align: center;
            color: white;
            text-transform: uppercase;
            height: 40px;
            border-bottom: rgb(68, 86, 243) 1px solid;
        }
        
        .close {
            width: 32px;
            height: 32px;
            background-color: orange;
            margin-left: auto;
            margin-right: auto;
            display: block;
            border-radius: 16px;
        }
        
        
        .show {
            display: block;
        }
        
        .hide {
            display: none;
        }
        
        @media (max-width: 420px) {
            .header {
                justify-content: right;
            }    
            .headerNav {
                display: none;
                overflow-x: scroll;
            }
            .menuIcon {
                display: block;
            }
        }            
    </style>

    <header class="header">
        <nav class="headerNav">
            <ul>
                <li id="index">
                    <a href="/index.html">Home</a>
                </li>
                <li id="actionPlan">
                    <a href="/pages/actionPlan.html">Action plan</a>
                </li>
                <li id="events">
                    <a href="/pages/events.html">Events</a>
                </li>
                <li id="faq">
                    <a href="/pages/faq.html">FAQ</a>
                </li>
                <li id="people">
                    <a href="/pages/people.html">People</a>
                </li>
                <li id="resources">
                    <a href="/pages/resources.html">Resources</a>
                </li>
            </ul>
        </nav>
        <img class="menuIcon" src="/imgs/ham-menu.svg">            
        
        <div class="menu">
            <div><a href="/index.html">Home</a><div>
            <div><a href="/pages/actionPlan.html">Action plan</a></div>
            <div><a href="/pages/events.html">Events</a></div>
            <div><a href="/pages/faq.html">FAQ</a></div>
            <div><a href="/pages/people.html">People</a></div>
            <div><a href="/pages/resources.html">Resources</a></div>
            <img class="close" src="/imgs/close.svg">
        </div>
    </header>
`;

/**
 * Custom header component for UCSB stat department
 */
class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: 'open'});
        shadowRoot.appendChild(headerTemplate.content);
    }

    static get observedAttributes() {
        return ['menu'];
    }    

}

customElements.define('us-header', Header);

// The followings are the functions for header action handlers

/**
 * Clears all the active class
 * @param {*} liNode Li HTMLElement 
 */
function clearActive(liNode) {
    liNode.parentNode.childNodes.forEach(node => {
        if (node.classList) {
            node.classList.remove('active');
        }
    });
}

/**
 * This is an event handler for the following actions in Header section
 * 1. hamburger menu button click handler
 * 2. menu close button click handler
 * 3. header menu click handler
 */
function registerHeaderActions() {
    const headerComp = document.querySelector('us-header').shadowRoot;
    const menuIcon = headerComp.querySelector('.menuIcon');
    const menus = headerComp.querySelector('.menu');
    const menuItem = headerComp.querySelector('header ul');

    // highlight the selected menu
    menuItem.childNodes.forEach(node => {
        if(location.pathname.indexOf(node.id) >= 0) {
            node.classList.add('active');
        }});

    menuIcon.addEventListener('click', function(){               
        menus.classList.toggle('show');
    });

    const closeIcon = headerComp.querySelector('.close');
    closeIcon.addEventListener('click', function(){
        menus.classList.remove('show');
    });

    menuItem.addEventListener('click', function(e){
        // clear all the active styles
        clearActive(e.target.parentElement);
        // dipslay active style for the selected menu
        e.target.parentElement.classList.add('active')
    });

};

