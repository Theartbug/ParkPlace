function request(url, options = {}, data) {
  if(data) options.body = JSON.stringify(data);

  return fetch(url, options)
    .then(response => [response.ok, response.json()])
    .then(([ok, json]) => {
      if(ok) return json;
      throw json.message || json.error || json.errors || json;
    });
}

const headers = {
  'content-type': 'application/json'
};

export const get = url => request(url);
export const getCORS = (url, options) => request(url, options);
export const post = (url, data) => request(url, { method: 'POST', headers }, data);
//TODO: add edit functionality to reviews put request
