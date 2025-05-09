<template>
  <div class="card bg-white rounded-lg shadow-md p-4 border border-gray-200">
    <h3 class="text-xl font-bold text-center mb-2">{{ card.name }}</h3>
    <p class="text-sm text-center text-gray-500 mb-1">
      {{ card.reversed ? '逆位' : '正位' }}
    </p>
    <div class="mt-3 text-sm text-gray-600">
      {{ card.meaning }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      required: true
    }
  }
}
</script>