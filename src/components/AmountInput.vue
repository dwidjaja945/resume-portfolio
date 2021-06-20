<template>
  <input
    class="amountInput"
    type="number"
    id="amount"
    step="0.01"
    pattern="[0-9]*"
    placeholder="0.00"
    :value="amount"
    @keyup="event => handleAmountChange(event.key)"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    amount: {
      type: String,
      required: true,
    },
  },
  methods: {
    handleAmountChange(key: string): void {
      if (Number.isNaN(Number(key)) && key !== 'Backspace') return;
      const split = this.amount.replace('.', '').split('');
      if (key === 'Backspace') {
        split.pop();
      } else {
        split.push(key);
      }
      split.splice(-2, 0, '.');
      if (split[0] === '0') {
        split.shift();
      }
      this.$emit('setAmount', split.join(''));
    },
  }
});
</script>

<style lang="scss" scoped>
.amountInput {
  text-align: right;
}
</style>
