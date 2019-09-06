<template>
  <div class="table-operator">
    <a-button
      type="primary"
      icon="plus"
      v-if="Add"
      @click="$emit('addNewTable')"
    >{{ $t('lang.tabComNewTableName') }}</a-button>
    <a-button
      type="primary"
      icon="edit"
      v-if="Update"
      @click="$emit('editSelectOne')"
    >{{ $t('lang.tabComActionEdit') }}</a-button>
    <a-button
      type="primary"
      icon="delete"
      v-if="Delete"
      @click="$emit('deleteSeclectAll')"
    >{{ $t('lang.tabComActionDel') }}</a-button>
    <a-button
      type="primary"
      icon="download"
      :loading="exportLoading"
      v-if="View"
      @click="exportOnClick"
    >{{ $t('lang.tabComExport') }}</a-button>
    <a-button type="primary" icon="upload" v-if="Upload" @click="uploadOnClick">{{ uploadShowName }}</a-button>
    <slot></slot>
  </div>
</template>

<script>
import Vue from "vue";
import { isNullOrUndefined } from "util";
import { download } from "@api/export_api";
import { ACCESS_TOKEN } from "@/store/mutation-types";

export default {
  name: "tableBtns",
  data() {
    return {
      exportLoading: false,
      manipulationAuth: []
    };
  },
  props: [
    "currentPageManipulationAuth",
    "uploadId",
    "exportId",
    "queryParamemter",
    "uploadAlias",
    "exportAlias"
  ],
  computed: {
    exportShowName() {
      return isNullOrUndefined(this.exportAlias) ? "Export" : this.exportAlias;
    },
    uploadShowName() {
      return isNullOrUndefined(this.uploadAlias) ? "Upload" : this.uploadAlias;
    },
    View() {
      return this.manipulationAuth.indexOf("View") == -1 ? false : true;
    },
    Add() {
      return this.manipulationAuth.indexOf("Add") == -1 ? false : true;
    },
    Update() {
      return this.manipulationAuth.indexOf("Update") == -1 ? false : true;
    },
    Delete() {
      return this.manipulationAuth.indexOf("Delete") == -1 ? false : true;
    },
    Upload() {
      return this.manipulationAuth.indexOf("Upload") == -1 ? false : true;
    }
  },
  created() {
    this.getManipulationAuth(this.currentPageManipulationAuth);
  },
  methods: {
    exportOnClick() {
      this.exportLoading = true;
      let xhr = new XMLHttpRequest();
      let json = {
        ...this.queryParamemter,
        eventName: this.exportId || this.uploadId
      };
      xhr.open("POST", "/pcg/api/common/exportExcel");
      xhr.responseType = "blob";
      xhr.setRequestHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      const token = Vue.ls.get("Access-Token");
      if (token) {
        xhr.setRequestHeader("pcgcfe-java-token", token);
      }
      xhr.send(JSON.stringify(json));
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
          if (
            !isNullOrUndefined(xhr.getResponseHeader("async")) &&
            xhr.getResponseHeader("async") == 1
          ) {
            this.$notification.open({
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
        }
        this.exportLoading = false;
        // window.location.href = url;
      };
    },
    uploadOnClick() {
      const originalPage = this.$route.name;
      this.$router.replace({
        path: `/upload/upload_list/${this.uploadId}/origin/${originalPage}`
      });
    },
    getManipulationAuth(currentPageManipulationAuth) {
      console.log(this.$route.path);
      const menu = Vue.ls.get("GET_MENU");
      console.log(typeof menu, menu);
      this.manipulationAuth.length = 0;

      currentPageManipulationAuth.forEach(item => {
        if (item.indexOf("Enforced") !== -1) {
          this.manipulationAuth.push(item.split("Enforced")[0]);
        } else {
          menu.forEach(childMenu => {
            childMenu["childMenuList"].forEach(element => {
              if (
                "/" + element["frontRouter"] == this.$route.path &&
                element["accessLevel"]
              ) {
                const temp = element["accessLevel"]
                  .split("+")
                  .filter(d => d.trim());
                if (temp.indexOf(item) !== -1) {
                  this.manipulationAuth.push(item);
                }
              }
            });
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
</style>
