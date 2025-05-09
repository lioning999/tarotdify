// 塔罗牌基础数据（简化版）
export const tarotDeck = [
  { id: 1, name: "愚者", category: "大阿卡纳" },
  { id: 2, name: "魔术师", category: "大阿卡纳" },
  { id: 3, name: "女祭司", category: "大阿卡纳" },
  // ... 完整78张牌数据
  { id: 78, name: "世界", category: "大阿卡纳" }
];

// 洗牌函数
export const shuffleDeck = () => {
  // 复制数组并打乱顺序
  const shuffled = [...tarotDeck].sort(() => Math.random() - 0.5);
  
  // 抽取前三张并随机设置正逆位
  return shuffled.slice(0, 3).map(card => ({
    ...card,
    reversed: Math.random() < 0.3, // 30%概率逆位
  }));
};