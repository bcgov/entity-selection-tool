<template>
  <div class="modal-card" scroll="keep">
    <div class="modal-card-head">
      <!-- slot name is all lowercase because of browser requirements -->
      <slot name="modalheader"></slot>
    </div>
    <div class="modal-card-body">
      <div class="content">
        <slot name="modalbody"></slot>
      </div>
    </div>
    <div class="modal-card-foot">
      <slot name="modalfooter"> </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseModal"
};
</script>

<style>
.bet-modal-card {
  background-color: rgba(39, 79, 110, 1);
}
</style>
