<template>
  <div class="tile is-parent">
    <div class="tile is-child box has-shadow">
      <div class="tile-header">
        <!-- slot name is all lowercase because of browser requirements -->
        <slot name="headertext"></slot>
      </div>
      <div class="content">
        <slot name="bodytext"></slot>
      </div>
      <div class="tile-footer">
        <slot name="footertext"> </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseTile"
};
</script>
