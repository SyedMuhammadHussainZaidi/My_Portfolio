const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const navbg = document.querySelector('.nav-bg');
const navbg1 = document.querySelector('.nav-bg1');
menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
    navbar.style.transition = "2s ease";
    navbg.classList.toggle('active');
    navbg1.classList.toggle('active');
    // document.getElementById("divHead").style.height = "216";
});
// header ki js ka kaam khtm

// section ki js ka kaam shuru
document.addEventListener("DOMContentLoaded", function () {
    const parallaxBg = document.querySelector(".parallax-bg");

    window.addEventListener("scroll", function () {
        let offset = window.pageYOffset;
        parallaxBg.style.backgroundPositionY = offset * 0.7 + "px"; // Adjust the parallax effect by changing the multiplier
    });
});
// cursor ka kaam

document.addEventListener('DOMContentLoaded', function () {
    const customCursor = document.createElement('div');
    customCursor.classList.add('custom-cursor');
    document.body.appendChild(customCursor);
    // document.iframe.appendChild(customCursor);
    // customCursor.innerHTML='<img src="cursor1.png" class="customCursor">'
    document.addEventListener('mousemove', (e) => {
        customCursor.style.left = e.pageX + 'px';
        customCursor.style.top = e.pageY + 'px';
    });
});

// quotes ka kaam shuru

// Function to load quotes from JSON file
async function loadQuotes() {
    const response = await fetch('index.json');
    const quotes = await response.json();
    return quotes;
}

function getContent(contentId) {
    document.getElementById(contentId).style.display = 'flex';
}
// technology card ka kaam shuru
Vue.config.devtools = true;

Vue.component('card', {
  template: `
    <div class="card-wrap"
      @mousemove="handleMouseMove"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      ref="card">
      <div class="card"
        :style="cardStyle">
        <div class="card-bg" :style="[cardBgTransform, cardBgImage]"></div>
        <div class="card-info">
          <slot name="header"></slot>
          <slot name="content"></slot>
        </div>
      </div>
    </div>`,
  mounted() {
    this.width = this.$refs.card.offsetWidth;
    this.height = this.$refs.card.offsetHeight;
  },
  props: ['dataImage'],
  data: () => ({
    width: 0,
    height: 0,
    mouseX: 0,
    mouseY: 0,
    mouseLeaveDelay: null
  }),
  computed: {
    mousePX() {
      return this.mouseX / this.width;
    },
    mousePY() {
      return this.mouseY / this.height;
    },
    cardStyle() {
      const rX = this.mousePX * 30;
      const rY = this.mousePY * -30;
      return {
        transform: `rotateY(${rX}deg) rotateX(${rY}deg)`
      };
    },
    cardBgTransform() {
      const tX = this.mousePX * -40;
      const tY = this.mousePY * -40;
      return {
        transform: `translateX(${tX}px) translateY(${tY}px)`
      }
    },
    cardBgImage() {
      return {
        backgroundImage: `url(${this.dataImage})`
      }
    }
  },
  methods: {
    handleMouseMove(e) {
      this.mouseX = e.pageX - this.$refs.card.offsetLeft - this.width/2;
      this.mouseY = e.pageY - this.$refs.card.offsetTop - this.height/2;
    },
    handleMouseEnter() {
      clearTimeout(this.mouseLeaveDelay);
    },
    handleMouseLeave() {
      this.mouseLeaveDelay = setTimeout(()=>{
        this.mouseX = 0;
        this.mouseY = 0;
      }, 1000);
    }
  }
});

const app = new Vue({
  el: '#app'
});