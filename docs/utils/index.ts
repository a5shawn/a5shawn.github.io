/**
 *  生成侧边栏配置项
 * @param module  模块名称
 * @param category  分类名称
 * @param items  分类下的具体项，包含文本和链接（如果链接不存在，则默认使用文本的小写形式作为链接）
 * @returns  侧边栏配置项数组
 */
export const getSidebarItems = (
  module: string,
  category: string,
  items: { text: string; link?: string }[] = [],
) => {
  return items.map((item) => ({
    text: item.text,
    link: `${module}/${category}/${item.link ? item.link : item.text.toLowerCase()}`,
  }));
};
