<template>
    <div v-if="state.signatures && state.signatures.length" class="card-expansion">
      <md-card v-for="signature of state.signatures">
        <md-card-media v-if="signature.render">
          <iframe :srcdoc="signature.render"></iframe>
        </md-card-media>
  
        <md-card-header>
          <div class="md-title">{{ signature.title }}</div>
          <div class="md-subhead">{{ signature.company }}</div>
          <div class="md-subhead">{{ signature.email }}</div>
        </md-card-header>
  
        <md-card-expand>
          <md-card-actions md-alignment="space-between">
            <div>
              <md-button @click="() => remove(signature.id)">Remove</md-button>
            </div>
          </md-card-actions>
        </md-card-expand>
      </md-card>
    </div>
  </template>

<script src="./dashboard-card"></script>
  
  <style lang="scss" scoped>
    .card-expansion {
      height: 480px;
    }
  
    .md-card {
      width: 320px;
      margin: 4px;
      display: inline-block;
      vertical-align: top;
    }
  </style>