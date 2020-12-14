function timeout1(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms)
  })
}

// async本身返回promise
async function timeout2(ms) {
  await new Promise((resolve, reject) => {
    setTimeout(resolve, ms)
  })
}

async function asyncPrint(value, ms) {
  await timeout2(ms)
  console.log(value)
}

// asyncPrint('hello world', 5000)

async function getTitle(url) {
  let res = await fetch(url)
  let html = await res.test()
  console.log('getTitle -> html', html)
  return html.match(/<title>([\s\S+]))<\/title>/i)[1]
}

// getTitle('https://tc39.github.io/ecma262/').then(console.log)

// 捕获异常

async function fn() {
  await Promise.reject('fail').catch((e) => {
    console.log(e)
  })
  return await Promise.resolve('hello xx')
}

// fn()

// 并发执行
async function eachAsync1() {
  let docs = [
    asyncPrint('hello 1', 400),
    asyncPrint('hello 2', 100),
    asyncPrint('hello 3', 200),
  ]
  let num = 1
  docs.forEach(async (doc) => {
    await doc
    console.log(num++)
    // console.log('eachAsync -> num', num)
  })
}
// eachAsync1()

// 继发执行？
async function eachAsync2() {
  let docs = [
    asyncPrint('hello 4', 800),
    asyncPrint('hello 5', 550),
    asyncPrint('hello 6', 600),
  ]
  let num = 4
  for (let promise of docs) {
    await promise
    console.log(num++)
  }
}
// eachAsync2()

// 异步任务
function GenLa(time) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve(time)
    }, time)
  })
}

// async function test1() {
//   let arr = [Gen(2000), Gen(100), Gen(3000)]
//   for (let item of arr) {
//     let num = await item
//     console.log('test -> num', num)
//   }
// }
// test1()

async function test2() {
  let arr = [GenLa(2000), GenLa(100), GenLa(3000)]
  //   arr.forEach(async (item) => {
  //     console.log(Date.now(), await item.then(console.log))
  //   })
  for (let item of arr) {
    console.log(Date.now(), await item.then(console.log))
  }
}
test2()
