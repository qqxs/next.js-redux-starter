import fetch from "isomorphic-fetch";

type Method = "GET" | "POST" | "PUT" | "DELETE";

// ⚠️注意：所有的body必须是json对象
const BASE_URL = ""; //"http://localhost:3000";

function initRequest(url: string, init?: RequestInit): [string, RequestInit] {
  let headers = {};

  // 判断请求是不是相对路径
  if (!/^http[s]?:|^\/\//.test(url)) {
    url = BASE_URL + url;
  }

  if (init && init.headers) {
    headers = Object.assign(
      {
        Authorization: `Bearer `, // 带上token的地方
        "Content-Type": "application/json;charset=utf-8",
      },
      headers
    );
  }

  return [url, { credentials: "include", ...init, headers }];
}

/**
 * @description fetch
 *
 * @param {string} url 请求接口地址
 * @param {Method} method 请求方式  "GET" | "POST" | "PUT" | "DELETE";
 * @param {json} body 请求数据
 * @param {RequestInit} init 请求配置项
 *
 * @returns fetch get data
 */

async function fetchD(
  url: string,
  method?: Method,
  body?: BodyInit,
  init?: Omit<RequestInit, "body" | "method">
) {
  [url, init] = initRequest(url, {
    ...init,
    method: method || "GET",
    body: JSON.stringify(body),
  });

  try {
    const res = await fetch(url, init);
    // 判断数据是不是json
    return res.json();
  } catch (error) {
    return Promise.reject(error);
  }
}

export default fetchD;
