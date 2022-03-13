<script lang="ts">
import { defineComponent } from 'vue';
import Tabs from '@/components/Tabs.vue';
import Tab from '@/components/Tab.vue';
import Card from '@/components/Card.vue';
export default defineComponent({
  name: 'Dashboard',
  components: {
    Tabs,
    Tab,
    Card,
  },
  data() {
    return {
      activeTab: 0,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    tabChanged(selectedTab: any) {
      this.activeTab = selectedTab.index;
      console.log('Tab changed to:' + selectedTab.name);
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  },
});
</script>

<template>
  <ul class="pr-4 font-semibold bg-white-100 border-b-2">
    <li class="inline mx-2 cursor-pointer">
      <img src="../assets/logo-1.png" class="inline w-16" />
    </li>
    <li class="inline mx-2 cursor-pointer">
      <img src="../assets/folder.png" class="inline w-8" />
    </li>
    <li class="inline mx-2 text-gray-600 hover:text-blue-900 cursor-pointer">
      Projects
    </li>
    <li class="float-right mt-4 inline mx-2 cursor-pointer">
      <img src="../assets/arrow.png" class="inline w-8" />
    </li>
    <li class="float-right mt-4 inline mx-2 cursor-pointer">
      <img src="../assets/profile.png" class="inline w-8" />
    </li>
    <li class="float-right mt-4 border-r-2 inline mx-2 cursor-pointer">
      <img src="../assets/notif.png" class="inline w-8" />
    </li>
  </ul>
  <div class="container w-4/5 mx-auto my-2">
    <h1 class="font-bold text-2xl">Projects Dashboard</h1>
  </div>
  <div class="container w-4/5 mx-auto my-2">
    <Tabs
      :tabsNames="['Employees', 'Departments']"
      searchPlaceholder="subject or reference"
      @changed="tabChanged"
    >
      <Tab name="Employees" :isActive="activeTab === 0">
        <div class="flex flex-row">
          <div class="w-1/3 p-8">
            <Card header="WORKING ON">
              <template #image>
                <img class="inline w-16" src="../assets/avatar-green.png" />
              </template>
              <template #title>
                <span>scrum-test</span>
                <img src="../assets/star.png" class="inline-block w-4" />
              </template>
            </Card>
            <Card :likeCount="3" :viewCount="1" :shareCount="1">
              <template #image>
                <img class="inline w-16" src="../assets/avatar-green.png" />
              </template>
              <template #title>
                <span>scrum-test</span>
                <img src="../assets/star.png" class="inline-block w-4" />
              </template>
              <template #body>
                <p>
                  testing
                </p>
              </template>
            </Card>
          </div>
          <div class="w-1/3 p-8">
            <Card header="WATCHING">
              <template #image>
                <img class="inline w-16" src="../assets/avatar-profile.png" />
              </template>
              <template #title>
                <span>kanban-test</span>
                <img src="../assets/star.png" class="inline-block w-4" />
              </template>
              <template #body>
                <p>
                  In publishing and graphic design, Lorem ipsum is a placeholder
                  text commonly used to demonstrate the visual form of a
                  document or a typeface without relying on meaningful content.
                  Lorem ipsum may be used as a placeholder before final copy is
                  available
                </p>
              </template>
              <template #button>
                <button
                  type="button"
                  class="bg-blue-900 rounded-lg text-white font-bold p-2 w-full m-2"
                >
                  Manage Projects
                </button>
                <button
                  type="button"
                  class="bg-blue-100 rounded-lg text-blue-900 font-bold p-2 w-full m-2"
                >
                  Edit Projects
                </button>
              </template>
            </Card>
            <Card>
              <template #image>
                <img class="inline w-16" src="../assets/avatar-yellow.png" />
              </template>
              <template #title>
                <span>kanban-test</span>
                <img src="../assets/star.png" class="inline-block w-4" />
              </template>
              <template #button>
                <button
                  type="button"
                  class="bg-blue-100 rounded-lg text-blue-900 font-bold p-2 w-full m-2"
                >
                  Manage Projects
                </button>
              </template>
            </Card>
          </div>
          <div class="w-1/3 p-8">
            <Card :likeCount="44" :viewCount="10" :shareCount="9">
              <template #image>
                <img class="inline w-16" src="../assets/avatar-yellow.png" />
              </template>
              <template #title>
                <span>scrum-test-2</span>
                <img src="../assets/star.png" class="inline-block w-4" />
              </template>
              <template #body>
                <p>
                  design
                </p>
              </template>
            </Card>
          </div>
        </div>
      </Tab>
      <Tab name="Departments" :isActive="activeTab === 1">
        <div class="flex flex-row">
          <div class="w-full p-8">
            This is the content of the second tab
          </div>
        </div>
      </Tab>
    </Tabs>
  </div>
</template>
