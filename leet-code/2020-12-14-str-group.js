/**
 * @description 同词字符串分组 --- 普通的hash的解法
 * @param {string[]} strs  ["eat", "tea", "tan", "ate", "nat", "bat"]
 * @return {string[][]} [
  ["ate","eat","tea"],
  ["nat","tan"],
  ["bat"]
]
 */
var groupAnagrams = function (
  strs = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat']
) {
  let hash = new Map()
  // 当前仅当排序后的字符串相等时，两个字符串是字母异位词
  for (let i = 0; i < strs.length; i++) {
    // 分割、默认排序、逗号拼接
    let str = strs[i].split('').sort().join()
    console.log('🚀 ~ file: demo.js ~ line 15 ~ groupAnagrams ~ str', str)
    if (hash.has(str)) {
      let temp = hash.get(str)
      temp.push(strs[i])
      hash.set(str, temp)
    } else {
      hash.set(str, [strs[i]])
    }
  }

  return [...hash.values()]
}

// groupAnagrams()
