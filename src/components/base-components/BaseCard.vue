<template>
  <div class="card">
    <div class="be-custom-header">
      <!-- slot names are all lowercase because of browser requirements -->
      <slot name="headertext"></slot>
    </div>
    <div class="card-content be-content">
      <div class="content">
        <slot name="bodytext"></slot>
      </div>
    </div>
    <div class="card-footer be-card-footer">
      <slot name="footertext"> </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseCard"
};
</script>

<style></style>
