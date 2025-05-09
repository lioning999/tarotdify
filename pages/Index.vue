<template>
  <div class="container mx-auto px-4 py-8 max-w-4xl">
    <!-- 表单部分 -->
    <form @submit.prevent="submitReading">
      <div class="mb-4">
        <label class="block text-gray-700 mb-2">姓名（可选）</label>
        <input v-model="form.name" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md">
      </div>
      
      <div class="mb-4">
        <label class="block text-gray-700 mb-2">问题类型</label>
        <select v-model="form.questionType" class="w-full px-3 py-2 border border-gray-300 rounded-md">
          <option value="love">爱情</option>
          <option value="career">事业</option>
          <option value="health">健康</option>
          <option value="finance">财务</option>
          <option value="other">其他</option>
        </select>
      </div>
      
      <div class="mb-6">
        <label class="block text-gray-700 mb-2">您的问题</label>
        <textarea v-model="form.question" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-md" required></textarea>
      </div>
      
      <button @click="shuffleCards" class="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md mb-6">
        洗牌抽牌
      </button>
    </form>
    
    <!-- 牌面展示 -->
    <div v-if="cards.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <TarotCard v-for="(card, index) in cards" :key="index" :card="card" />
    </div>
    
    <!-- 占卜结果 -->
    <div v-if="result" class="bg-gray-50 rounded-lg p-6 shadow-md">
      <h2 class="text-xl font-bold mb-4">占卜结果</h2>
      <div class="prose max-w-none">
        <p>{{ result.interpretation }}</p>
      </div>
      
      <div class="mt-6">
        <h3 class="font-bold text-lg mb-3">行动建议</h3>
        <ul class="space-y-2">
          <li v-for="(suggestion, index) in result.suggestions" :key="index" class="flex items-start">
            <span class="text-purple-600 mr-2 mt-1">•</span>
            <span>{{ suggestion }}</span>
          </li>
        </ul>
      </div>
    </div>
    
    <!-- 人机验证 -->
    <Captcha @verified="captchaVerified" />
    
    <!-- 加载状态 -->
    <div v-if="loading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg flex items-center">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mr-4"></div>
        <span>正在连接神秘力量...</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import TarotCard from '@/components/TarotCard.vue';
import Captcha from '@/components/Captcha.vue';
import { shuffleDeck } from '@/assets/tarot-data';
import { getTarotReading } from '@/services/api';

export default {
  components: {
    TarotCard,
    Captcha
  },
  setup() {
    const form = ref({
      name: '',
      questionType: 'love',
      question: ''
    });
    
    const cards = ref([]);
    const result = ref(null);
    const loading = ref(false);
    const captchaVerified = ref(false);
    
    // 洗牌函数
    const shuffleCards = () => {
      cards.value = shuffleDeck();
      result.value = null;
    };
    
    // 提交占卜请求
    const submitReading = async () => {
      if (!captchaVerified.value) {
        alert('请先完成人机验证');
        return;
      }
      
      if (!form.value.question) {
        alert('请输入您的问题');
        return;
      }
      
      if (cards.value.length === 0) {
        alert('请先洗牌抽牌');
        return;
      }
      
      loading.value = true;
      
      try {
        const response = await getTarotReading({
          name: form.value.name,
          questionType: form.value.questionType,
          question: form.value.question,
          cards: cards.value.map(card => ({
            id: card.id,
            reversed: card.reversed
          }))
        });
        
        result.value = response.data;
      } catch (error) {
        console.error('占卜失败:', error);
        alert('占卜失败，请稍后再试');
      } finally {
        loading.value = false;
        captchaVerified.value = false;
      }
    };
    
    return {
      form,
      cards,
      result,
      loading,
      captchaVerified,
      shuffleCards,
      submitReading
    };
  }
}
</script>