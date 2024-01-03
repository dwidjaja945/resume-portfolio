<template>
  <Navigation :show="isHome">
    <div class="root" :class="{ resume: !isHome }">
      <header class="header">
        <h1>
          Dylan Widjaja
        </h1>
        <div class="header-info">
          <div class="info">
            <h3 v-if="showSmall">Contact</h3>
            <a :href="`tel:${phone}`">{{ phone }}</a>
            <a :href="`mailto:${email}`" class="link">{{ email }}</a>
          </div>
          <div class="info">
            <h3 v-if="showSmall">Links</h3>
            <a class="link" :href="`https://${linkedin}`" target="_blank">
              {{ linkedin }}
            </a>
            <a class="link" :href="`https://${github}`" target="_blank">
              {{ github }}
            </a>
          </div>
          <div>
            <h3 v-if="showSmall">Location</h3>
            {{ location }}
          </div>
        </div>
      </header>

      <hr />

      <div :class="['content', isHome && 'padded']">
        <div class="left">
          <div class="work-experience content-item">
            <h3 class="title">Work Experience</h3>
            <div class="experience">
              <h4 class="experience-title">Presta</h4>
              <div class="company">
                <span>Senior Software Engineer</span>
                <span>Jan 2023 - Present</span>
              </div>
              <ul>
                <li><b>Led</b> and <b>mentored</b> a team of junior engineers</li>
                <li><b>Implemented</b> dev infrastructure, <b>reducing</b> friction</li>
                <li><b>Prioritized and delegated</b> work to optimize velocity</li>
                <li><b>Designed</b> application and feature architectures</li>
                <li><b>Implemented and enforced</b> code standards and best practices</li>
                <li><b>Collaborated</b> with designer and product manager to prioritize work</li>
                <li>Wrote performant code following best <b>web accessibility</b> guidelines</li>
                <li>Technologies: <b>ReactJS, Typescript, NodeJS, Postgres</b></li>
              </ul>
            </div>
            <div class="experience">
              <h4 class="experience-title">Meta (formerly Facebook)</h4>
              <div class="company">
                <span>Software Engineer</span>
                <span>Jan 2021 - Nov 2022</span>
              </div>
              <ul>
                <li>
                  Facebook Groups
                  <ul>
                    <li>
                      Improved <b>initial page load time by 2%</b>, increasing
                      <b>
                        Daily Active Users by 4%
                      </b>
                      and
                      <b>
                        Sessions by 1%
                      </b>
                    </li>
                    <li>
                      Built Groups You Should Join,
                      <b>increasing groups joined per day by 2k</b>
                    </li>
                    <li>
                      Built a <b>Fallback Feed</b> mechanism, <b>increasing session time by 2%</b>,
                      and
                      <b>reducing broken feed occurrences by 10%</b>
                    </li>
                  </ul>
                </li>
                <li>
                  Server Capacity Management
                  <ul>
                    <li>
                      <b>Rearchitected</b>
                      the internal portal UI to handling server capacity and budgeting,
                      <b>reducing initial load time by 6%</b>, and
                      <b>improving app navigation</b>
                    </li>
                    <li>
                      <b>Prioritized and delegated</b> work to off-shore teams to move project
                      forward
                    </li>
                  </ul>
                </li>
                <li>
                  Ads Experiments
                  <ul>
                    <li>
                      <b>Increased visibility</b> of advertisers' most successful A/B Tested ads
                    </li>
                  </ul>
                </li>
                <li>Technologies: <b>ReactJS, Relay, Hack(PHP), GraphQL</b></li>
              </ul>
            </div>
            <div class="work-experience">
              <h4 class="experience-title">SurePrep LLC – Professional Tax Automation Software</h4>
              <div class="company">
                <span>Software Engineer</span>
                <span>Oct 2018 - Dec 2020</span>
              </div>
              <ul>
                <li>
                  Utilize the latest versions of ReactJS/ReduxJS to build an <b>accessible</b> and
                  <b>translated</b> web application for CPAs and consumers to communicate
                </li>
                <!-- <li>Use <b>LESS</b> to implement styling from in-house UI/UX designer</li> -->
                <li>
                  Implemented Dark Mode into application with Material-UI
                </li>
                <li>
                  Work in an Agile environment with an offshore team
                </li>
                <li>
                  Interviewed potential candidates to add to the team
                </li>
                <li>Tech: <b>ReactJS, ReduxJS, LESS, Material-UI, JIRA</b></li>
              </ul>
            </div>
            <!-- <div class="experience">
              <h4 class="experience-title">BigRentz – Construction Rental Service</h4>
              <div class="company">
                <span>Web Developer</span>
                <span>2018</span>
              </div>
              <ul>
                <li>
                  Built static web pages using WordPress
                </li>
                <li>
                  Tech: WordPress, HTML, CSS
                </li>
              </ul>
            </div> -->
          </div>
          <div class="applications content-item">
            <h3 class="title">Applications Developed</h3>
            <!-- <div>
              <h4 class="application-name">TeamStream – Communication System for Athletes</h4>
              <ul>
                <li>
                  Utilized NodeJS to build server and backend endpoints to connect to a MySQL
                  relational database
                </li>
                <li>
                  Deployed application to an AWS EC2 webserver.
                </li>
                <li>Tech: <b>ReactJS, NodeJS, MySQL, AWS EC2, Certbot</b></li>
              </ul>
            </div> -->
            <div>
              <h4 class="application-name">KKBO – Budgeting Application</h4>
              <ul>
                <li>
                  Creating and Architecting an in-progress application using React, Typescript, and
                  Firebase/Firestore
                </li>
                <li>
                  Based off the Japanese saving method, Kakeibo
                </li>
                <li>Deploying application from Google Cloud Platform</li>
                <li>Tech: <b>NextJS, Typescript, GCP, Firebase, Firestore</b></li>
              </ul>
            </div>
            <div>
              <h4 class="application-name">Disneyland Reservation Finder – Chrome Extension</h4>
              <ul>
                <li>
                  Used Vanilla Javascript to build an Extension to help find reservations on the
                  Disneyland Website
                </li>
                <li>Tech: <b>Vanilla JS, Chrome Extension API</b></li>
              </ul>
            </div>
          </div>
        </div>

        <div class="right">
          <div>
            <h3 class="title">Education</h3>
            <div class="education-item">
              <p><b>California State University, Long Beach</b></p>
              <p>B.S. Kinesiology - Exercise Science</p>
            </div>
            <div class="education-item">
              <p><b>LearningFuze</b> Accelerated Web Development</p>
            </div>
          </div>

          <div class="technical-skills">
            <h3 class="title">Technical Skills</h3>
            <div class="skills-row">
              <div class="skills-container">
                <b>Strong</b>
                <div class="skills">
                  <ul>
                    <li>Typescript</li>
                    <li>Javascript (ES5, ES6)</li>
                    <li>Python</li>
                    <li>PHP</li>
                    <li>ReactJS/TS</li>
                    <li>React-Native</li>
                    <li>React Hooks</li>
                    <li>ReduxJS</li>
                    <li>GraphAPI</li>
                    <li>Relay</li>
                    <li>VueJS</li>
                    <li>NodeJS</li>
                  </ul>
                  <ul>
                    <li>Netlify</li>
                    <li>LESS</li>
                    <li>SCSS</li>
                    <li>SASS</li>
                    <li>Git</li>
                    <li>APIs</li>
                    <li>OOP</li>
                    <li>HTML</li>
                    <li>CSS</li>
                    <li>JSON</li>
                    <li>jQuery</li>
                    <li>Agile Methodology</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="skills-row">
              <div class="skills-container">
                <b>Experienced</b>
                <div class="skills">
                  <ul>
                    <li>Material UI</li>
                    <li>NextJS</li>
                    <li>Gatsby</li>
                    <li>Firebase</li>
                    <li>Firestore</li>
                    <li>CSS Grid</li>
                    <li>Flexbox</li>
                    <li>CSS Modules</li>
                    <li>MySQL</li>
                    <li>MongoDB</li>
                    <li>Regex</li>
                    <li>GCP</li>
                    <li>AWS</li>
                    <li>Certbot</li>
                  </ul>
                  <div></div>
                </div>
              </div>
              <div class="skills-container">
                <b>Tools</b>
                <ul>
                  <li>React Testing Library</li>
                  <li>Jest</li>
                  <li>VS Code</li>
                  <li>Postman</li>
                  <li>JIRA</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 class="title">Personal Hobbies</h3>
            <div>
              <b>Rowing</b>
              <p>Junior National Rowing Team High Performance Training Camp</p>
              <p>California State University Long Beach Men’s Rowing</p>
              <ul>
                <li>
                  Constructed and organized training plans for teammates using Kinesiology
                  background
                </li>
                <li>
                  Built a positive team mentality by maintaining open communication and personal
                  relationships with the athletes
                </li>
              </ul>
              <b>Musician</b>
              <ul>
                <li>Jazz pianist</li>
                <li>Self-taught electronic music producer</li>
                <li>Self-taught bartender</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Navigation>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useResize, Data as UseResizeData } from "@/toolkit/mixins";
import Navigation from "@/components/Navigation.vue";

interface Data extends UseResizeData {
  showSmall: boolean;
  isHome: boolean;
  email: string;
  linkedin: string;
  github: string;
  location: string;
  phone: string;
}

export default defineComponent({
  name: "Resume",
  components: {
    Navigation
  },
  mixins: [useResize()],
  computed: {
    isHome(): boolean {
      return this.$route.path === "/resume";
    }
  },
  data(): Partial<Data> {
    return {
      showSmall: false,
      windowWidth: 0,
      email: process.env.VUE_APP_EMAIL,
      linkedin: process.env.VUE_APP_LINKEDIN,
      github: process.env.VUE_APP_GITHUB,
      location: process.env.VUE_APP_LOCATION,
      phone: process.env.VUE_APP_PHONE
    };
  },
  watch: {
    windowWidth() {
      if (this.windowWidth !== undefined) {
        this.showSmall = this.windowWidth < 576;
      }
    }
  },
  created() {
    if (!this.isHome) {
      window.print();
    }
  }
});
</script>

<style lang="scss" scoped>
.root {
  margin-bottom: 60px;
}

p {
  padding: 0;
  margin: 0;
}
a {
  color: var(--primary);
}
h1,
h2,
h3,
h4 {
  margin: 0;
}
ul {
  margin: 0;
}

.resume {
  font-size: 12px;
}

.info {
  > * {
    display: block;
  }
}

.link {
  font-weight: bold;
}
.header {
  display: flex;
  justify-content: center;
  flex-direction: column;
  color: var(--primary);
}

.header-info {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
}

.title {
  font-variant-caps: small-caps;
  color: var(--secondary);
}

.content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
  &.padded {
    padding: 0 5%;
  }
}

.left,
.right {
  text-align: left;
}

.experience {
  margin-bottom: 10px;
}

.experience-title {
  font-weight: bold;
}

.company {
  display: flex;
  justify-content: space-between;
}

.education-item {
  margin-bottom: 5px;
}

.skills-row {
  display: flex;
  justify-content: space-between;
}

.skills-container {
  flex: 1;
}

.skills {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
}

@media screen and (max-width: 576px) {
  .header-info {
    grid-template-columns: unset;
    grid-template-rows: repeat(auto, 60px);
  }
}

// Medium devices (tablets, 768px and up)
@media screen and (max-width: 768px) {
  .content {
    display: block;
  }
}

// Large devices (desktops, 992px and up)
@media screen and (max-width: 992px) {
}

// Extra large devices (large desktops, 1200px and up)
@media screen and (max-width: 1200px) {
}
</style>
