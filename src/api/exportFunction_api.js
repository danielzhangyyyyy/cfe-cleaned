import Vue from "vue";
import notification from 'ant-design-vue/es/notification'
import { isNullOrUndefined } from "util";

export function exportByURL(params, url) {
  return new Promise((resolve, reject) => {
    let data = new Date();
    let xhr = new XMLHttpRequest();
    // let json = {
    //   ...this.queryParamemter,
    //   eventName: this.exportId || this.uploadId
    // };
    xhr.open("POST", "/pcg/api/" + url);
    xhr.responseType = "blob";
    xhr.setRequestHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    const token = Vue.ls.get("Access-Token");
    if (token) {
      xhr.setRequestHeader("pcgcfe-java-token", token);
    }
    xhr.send(JSON.stringify(params));
    xhr.onreadystatechange = () => {
      console.log("xhr.readyState1",xhr.readyState);
      if (xhr.readyState == 4 && xhr.status == 200) {
        if (
          !isNullOrUndefined(xhr.getResponseHeader("async")) &&
          xhr.getResponseHeader("async") == 1
        ) {
          notification.open({
            message: "Info",
            description: "Start exporting, please wait...",
            style: { background: "#52C41A" }
          });
        } else {
          let title = xhr.getResponseHeader("Content-Disposition")
            ? xhr.getResponseHeader("Content-Disposition").split("=")[1]
            : new Date().toLocaleString();
          if ("msSaveOrOpenBlob" in navigator) {
            //IE
            window.navigator.msSaveOrOpenBlob(
              new Blob([xhr.response]),
              title
            );
          } else {
            // non-IE
            let blob = new Blob([xhr.response], {
              type: "application/vnd.ms-excel"
            });
            let url = URL.createObjectURL(blob);
            let aLink = document.createElement("a");
            aLink.href = url;
            aLink.download = title;
            aLink.click();
          }
        }
        resolve("Success");
      }
    };
  })
}