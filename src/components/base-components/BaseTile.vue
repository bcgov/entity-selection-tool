<template>
  <div class="tile is-parent">
    <div class="tile is-child box has-shadow">
      <!-- <div class="tile-header"> -->
      <!-- slot name is all lowercase because of browser requirements -->
      <!--    <slot name="tileheader"></slot>
      </div> -->
      <div class="content">
        <slot name="tilebody"></slot>
      </div>
      <!--   <div class="tile-footer">
        <slot name="tilefooter"> </slot>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseTile"
};
</script>
