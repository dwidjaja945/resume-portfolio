<template>
  <Navigation>
    <header>
      <h1>Hi, I&apos;m Dylan Widjaja</h1>
    </header>
    <main>
      <section class="left">
        <div class="profile-image">
          <img class="image" :src="profileImg" alt="Profile photo" />
        </div>
        <div>
          <p>I'm a Software Engineer with strong skills in UI Engineering.</p>
          <p>
            I primarily specialize in <b>React</b>, <b>Typescript</b>, and <b>Redux</b>, but
            I am always open to learn new technology stacks.
            Even this current site is built in <b>Vue</b>!
          </p>
          <p>
            Although I am primarily a UI engineer, I definitely do want to expand
            my skillset to something more than just UI
          </p>
        </div>
      </section>

      <section class="right">
        <div>
          <p>
            Feel free to look at my resume
            <router-link
              to="/resume"
              target="_blank"
              aria-label="link to resume"
              rel="noopener noreferrer"
            >
              here
            </router-link>
            (<router-link
              to="/printable-resume"
              target="_blank"
              rel="noopener noreferrer"
            >printable version</router-link>),
            but here is a small blurb of my background:
          </p>
          <p>
            I received my B.S. in Kinesiology - Exercise Science
            at California State University, Long Beach, hoping to
            become a Physical Therapist.
            In my last semester, I made a last minute decision to not pursue it anymore.
            So I worked for about a year at a Medical Device company as a Regulatory
            Affairs Analyst. While working there, I had some friends convince me to
            consider going into software, so I started studying.
          </p>
          <p>
            After that job, I attended <b>LearningFuze</b>, an accelerated coding bootcamp.
            Shortly finishing the bootcamp, I was offered a role at a Tax Automation
            Software company called <b>SurePrep</b>. There is where I solidifed myself as a
            Software Engineer.
          </p>
          <p>
            At <b>SurePrep</b>, I worked on the UI for <b>TaxCaddy</b> - an interface that allows
            CPAs and Consumers to communicate and transfer documents. Essentially, a tool that helps
            CPAs and Consumers do taxes. Since the API was housed off-shore, I gained
            and immense knowledge of <b>React</b> and <b>Web</b> practices as well as
            <b>Agile Methedologies</b> and cross-team workflows.
          </p>
          <p>
            After a little over two years at <b>SurePrep</b>, I changed jobs
            and received an offer for <b>Amazon</b> and <b>Facebook</b>.
            Between the two, I decided to go to <b>Facebook</b>, where I work now.
          </p>
        </div>
        <div class="images">
          <img :src="learningFuzeImg" alt="learning-fuze image">
          <img :src="sureprepImg" alt="sureprep image">
        </div>
      </section>
    </main>
  </Navigation>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navigation from '@/components/Navigation.vue';
import Profile from '@/assets/images/profile.jpg';
import LFZ from '@/assets/images/learning-fuze.png';
import SurePrep from '@/assets/images/sureprep.jpeg';

export default defineComponent({
  name: 'Home',
  components: {
    Navigation,
  },
  data() {
    return {
      profileImg: Profile,
      learningFuzeImg: LFZ,
      sureprepImg: SurePrep,
    };
  },
});
</script>

<style lang="scss" scoped>
h1 {
  margin: 0;
}
header {
  background-image: url("../assets/images/hero.jpg");
  background-position: center;
  background-repeat: no-repeat;
  height: 30vh;
  display: flex;
  justify-content: center;
  padding: 10px;
}
main {
  transition: padding 0.2s linear;
  padding: 20px 25% 200px;
  background: var(--gradientBackground);
}
section {
  text-align: left;
}
img {
  transition: width, height 0.2s linear;
  box-shadow: 0 0 13px 1px rgba(0, 0, 0, 0.5);
}

.profile-image {
  display: flex;
  align-items: center;
  img {
    height: 200px;
    width: 200px;
    border-radius: 50%;
  }
}

.left,
.right {
  display: grid;
  grid-gap: 20px;
}
.left {
  grid-template-columns: auto 4fr;
}
.right {
  grid-template-columns: 4fr auto;
}
.images {
  display: flex;
  flex-direction: column;
  img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    margin-bottom: 20px;
  }
}

// Large devices (desktops, 992px and up)
@media screen and (max-width: 992px) {
  main {
    padding-left: 15%;
    padding-right: 15%;
  }
}

// Medium devices (tablets, 768px and up)
@media screen and (max-width: 768px) {
  main {
    padding-left: 10%;
    padding-right: 10%;
  }
  .images {
    justify-content: space-around;
    img {
      width: 100px;
      height: 100px;
    }
  }
}

@media screen and (max-width: 576px) {
  main {
    padding-left: 5%;
    padding-right: 5%;
  }
}

@media screen and (max-width: 500px) {
  $imgSize: 75px;
  main {
    padding-left: 5%;
    padding-right: 5%;
  }
  .profile-image {
    align-items: flex-start;
    img {
      height: $imgSize;
      width: $imgSize;
    }
  }

  .images {
    img {
      width: $imgSize;
      height: $imgSize;
    }
  }
}

</style>
