<template>
    <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary">
        <span class="md-title">{{ state && state.userData.fullname }}</span>
      </md-app-toolbar>
      <md-app-drawer md-permanent="clipped">
        <md-list>
          <md-list-item @click="() => logout()">
            <md-icon>error</md-icon>
            <span class="md-list-item-text">Logout</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <AddEntity />
        <DashboardCard />
      </md-app-content>
        
    </md-app>
    </div>
</template>

<script src="./dashboard.js"></script>