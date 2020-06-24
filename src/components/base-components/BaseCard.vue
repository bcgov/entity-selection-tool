<template>
  <div class="card">
    <div class="custom-header">
      <!-- slot name is all lowercase because of browser requirements -->
      <slot name="headertext"></slot>
    </div>
    <div class="card-content">
      <div class="content">
        <slot name="bodytext"></slot>
      </div>
    </div>
    <div class="custom-footer">
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
