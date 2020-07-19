const template = document.createElement('template');
template.innerHTML = `
<style>
.form-field-control {
	background: white;
	border-radius: 4px 4px 0 0;
	overflow: hidden;
	position: relative;
	width: 100%;
}
.form-field-label {
	font-size: var(--font-size);
	border: 0;
	display: block;
	font-weight: normal;
	left: 0;
	margin: 0;
	padding: 18px 12px 0;
	position: absolute;
	top: 0;
	-webkit-transition: all .4s;
	-o-transition: all .4s;
	transition: all .4s;
	width: 100%;}

.form-field-input, .form-field-textarea {
	position: relative;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	background: transparent;
	border: 0;
			border-bottom-color: currentcolor;
			border-bottom-style: none;
			border-bottom-width: 0px;
	border-bottom: 1px solid #999;
	color: #333;
	display: block;
	font-size: 16px;
	margin-top: 24px;
	outline: 0;
	padding: 0 12px 10px 12px;
	width: 100%;
}

.form-field-control::after {
	border-bottom: 2px solid teal;
	bottom: 0;
	content: "";
	display: block;
	left: 0;
	margin: 0 auto;
	position: absolute;
	right: 0;
	-webkit-transform: scaleX(0);
	-ms-transform: scaleX(0);
	transform: scaleX(0);
	-webkit-transition: all .4s;
	-o-transition: all .4s;
	transition: all .4s;
	width: 1%;}

.form-container {
	display: grid;
	grid-template-columns: 60% auto;
	grid-column-gap: 30px;
	width: 100%;
	-webkit-box-align: start;
	-webkit-align-items: start;
	-moz-box-align: start;
	-ms-flex-align: start;
	align-items: start;}

.form-container .form-fields-container {
  
	display: grid;
	grid-template-columns: auto auto;
	grid-column-gap: 30px;
	grid-row-gap: 25px;
	-webkit-box-align: start;
	-webkit-align-items: start;
	-moz-box-align: start;
	-ms-flex-align: start;
  align-items: start;
}
.form-field-is-active .form-field-label {
	font-size: var(--font-size);
	color: teal;
	font-size: 16px;
	-webkit-transform: translateY(-14px);
	-ms-transform: translateY(-14px);
	transform: translateY(-14px)
}

.form-field-is-filled .form-field-label {
	font-size: 16px;
	-webkit-transform: translateY(-14px);
	-ms-transform: translateY(-14px);
	transform: translateY(-14px)
}


  </style>

<div class="form-field"  part="container">
<div class="form-field-control">
  <label for="full_name" class="form-field-label" part="awesome-label"><span></span></label>
  <input id="full_name" name="full_name" type="text" class="form-field-input" part="awesome-input" />
</div>
</div>

`;
class AwesomeInput extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.appendChild(template.content.cloneNode(true));
		// this.labelColor = this.getAttribute('label-color');
		this.shadowRoot.querySelector('input').name = this.getAttribute('input-name');
		this.shadowRoot.querySelector('input').id = this.getAttribute('input-id');
		this.shadowRoot.querySelector('label span').innerText = this.getAttribute('label-text');
		this.shadowRoot.querySelector('label').for = this.getAttribute('label-for');
	}



	connectedCallback() {

		const setActive = (el, active) => {
			const formField = el.parentNode.parentNode;
			// const label = el.parentNode.querySelector('.form-field-label');
			if (active) {
				// label.setAttribute('awesome-label-active', 'active');
				formField.classList.add('form-field-is-active');

			} else {
				formField.classList.remove('form-field-is-active');
				// label.style.color = '';
				// label.removeAttribute('awesome-label-active');
				el.value === '' ?
					formField.classList.remove('form-field-is-filled') :
					formField.classList.add('form-field-is-filled')
			}
		};

		[].forEach.call(
			this.shadowRoot.querySelectorAll('.form-field-input, .form-field-textarea'),
			(el) => {
				el.onblur = () => {
					setActive(el, false)
				};
				el.onfocus = () => {
					setActive(el, true)
				}

			}
		);


		// this.shadowRoot.querySelector('#toggle-info').addEventListener('click', () => this.toggleInfo());
	}


	disconnectedCallback() {
		// this.shadowRoot.querySelector('#toggle-info').removeEventListener();
	}
}

window.customElements.define('awesome-input', AwesomeInput);