const singleAccoridonTemplate = document.createElement('template');
singleAccoridonTemplate.setAttribute('id', 'single-accordion-template');
singleAccoridonTemplate.innerHTML = `
    <style>
        .action-plan-desc {
            line-height: 24px;
            margin-bottom: 20px;
        }
        
        .accordion {
            margin-bottom: 20px;
        }
        
        .nob {
            transition-duration: 1s;
        }
        
        .rotated {
            transform: rotateX(3.142rad);
        }
        
        .title-bar {
            height: 26px;
            background-color: rgba(65, 84, 189, 0.719);
            display: flex;
            justify-content: start;
            align-items: center;
            padding: 4px 16px;
            border: 1px solid rgb(117, 115, 243);
            border-radius: 3px;
        }
        
        .title {
            padding-left: 16px;
            color:white;
        }
        
        .details {
            background-color: rgb(240, 244, 247);
            max-height: 0;
            overflow: hidden;
            transition: all .3s ease-in-out;
            line-height: 20px;
            border-radius: 3px;
        }
        
        .details.expand {
            max-height: 200px;
        }
        
        .inner-details {
            margin: 16px;
        }
    
    </style>

    <div class="accordion">
        <div class="title-bar">
            <img id="nob" class="nob" src="/imgs/down.svg"/>
            <div class="title">
                <slot name="title">Overview</slot>
            </div>
        </div>
        <div class="details">
            <div class="inner-details">
                <slot name="details">
                    details contents<br>
                    details contents<br>
                </slot>
            </div>
        </div>
    </div>
`;

/**
 * Custom header component for UCSB stat department
 */
class SingleAccordion extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open'});
        const templateContent = singleAccoridonTemplate.content;
        shadowRoot.appendChild(templateContent.cloneNode(true));
    }
}

customElements.define('us-single-accordion', SingleAccordion);

// The followings are the functions for single accordion action handlers

function registerSingleAccordionActions() {
    const singleAccordionComps = document.querySelectorAll('us-single-accordion');
    singleAccordionComps.forEach(singleAccordion => {
        const saShadowRoot = singleAccordion.shadowRoot;
        const accordion = saShadowRoot.querySelector('.accordion');
        const accordionNob = saShadowRoot.querySelector('.accordion .nob');
        const accordionDetails = saShadowRoot.querySelector('.accordion .details');
        accordion.addEventListener('click', () => {
            accordionNob.classList.toggle('rotated');
            accordionDetails.classList.toggle('expand');
        });          
    });
}