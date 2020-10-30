import { FiberSmartRecordSharp } from "../../node_modules/@material-ui/icons/index"

export function updateLevel(channel: number, level:number) {
  console.log(`UPDATING LEVEL ${channel} to ${level}`)
}

/**
 * 
 * @param server 
 * @param stateJson 
 */
export function uploadStateToServer(server: string, stateJson: string): Promise<JSON> {
  const endPoint:RequestInfo = `${server}/api/upload`;

  const request = new Request(endPoint, {
    method: 'post',
    body: stateJson
  })
  

  let result: Promise<Response> = fetch(endPoint, request)

  return new Promise( (resolve, reject) => {
    result.then(r => {
      if(r.ok) {
        r.json()
          .then(j => resolve(j))
          .catch(e => reject(e))
      } else {
        reject(`Response not ok: ${r.status} ${r.statusText}`)
      }
    }).catch(err=>{
      reject(err)
    })
  }
)
}

