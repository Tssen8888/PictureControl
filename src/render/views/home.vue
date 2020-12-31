<template>
  <div>
    <div class="main">
      <div class="treeDiv" :style="{'height' : screeHeight + 'px' , 'width' : screenWidth * 0.2 + 'px'}">
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick">
          <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button type="text" size="mini" @click="() => append(data)">添加</el-button>
          <el-button type="text" size="mini" @click="() => remove(data)">删除</el-button>
          <!--          <el-button type="text" size="mini" @click="() => update(data)">修改</el-button>-->
        </span>
      </span>
        </el-tree>
      </div>
      <div class="imagesTree" :style="{'height' : screeHeight + 'px' , 'width' : screenWidth * 0.8 + 'px'}">
        <div v-if="imageShow">
          <div class="imagesButton">
            <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess">
              <i class="avatar-uploader-icon">添加图片</i>
            </el-upload>
            <div class="imageDelete">
              <button>删除图片</button>
            </div>
          </div>
          <br/>
          <viewer>
            <img :src="imageUrl">
          </viewer>
          <br/>
          <div>
            <span>图片描述</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Viewer from 'v-viewer';

let _this;

export default {
  data() {
    return {
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      imageUrl: "",
      imageShow: false,
      screenWidth: document.body.clientWidth,
      screeHeight: document.body.clientHeight,
      imageUploadUrl: "",
      localPath: "",
      localId: "",
    }
  },
  comments: {
    Viewer
  },
  created() {
    _this = this;
    _this.getTreeData();
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUploadUrl = URL.createObjectURL(file.raw);
      let formData = new FormData();
      formData.append('files', file.raw);
      formData.append('path', _this.localPath);
      formData.append('catalogID', _this.localId);
      _this.$axios.post(_this.$PJS.url + "/file/uploadFIle", formData, {headers: {"Content-Type": "multipart/form-data; boundary=----WebKitFormBoundaryVCFSAonTuDbVCoAN"}}).then(data => {
            if (data.data.type == "success") {
              alert("上传成功");
            }
          }
      );
    },
    getTreeData() {
      _this.$axios.get(_this.$PJS.url + "/file/queryDataForTree").then(data => {
            if (data.data.type == "success") {
              _this.data = _this.getTreeList(data.data.data);
            }
          }
      );
    },
    append(data) {
      this.$prompt('节点名字', '增加节点', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({value}) => {
        let param = {
          parentCatalogPath: data.localPath,//父目录路径
          catalog: value,//名称
          parentID: data.id,//父目录id
          description: "",//描述
        };
        _this.$axios.post(_this.$PJS.url + "/file/addCatalog", _this.$qs.stringify(param)).then(data => {
          if (data.data.type == "success") {
            alert("新增成功");
            _this.getTreeData();
          }
        });
      });
    },
    remove(data) {
      let param = {
        path: data.localPath
      };
      _this.$axios.post(_this.$PJS.url + "/file/deleteDir", _this.$qs.stringify(param)).then(data => {
        if (data.data.type == "success") {
          alert("删除成功");
          _this.getTreeData();
        }
      });
    },
    update() {

    },
    handleNodeClick(data) {
      if (data.isLeaf == "1") {
        _this.imageShow = true;
      }
      if (data.isLeaf == "0") {
        _this.imageShow = false;
      }
      _this.localPath = data.localPath;
      _this.localId = data.id;
      _this.imageUrl = _this.$PJS.url + "/file/queryImgByPath?path=" + data.localPath;
    },
    getTreeList(arr) {
      let firstClassList = [];
      for (let i = 0; i < arr.length; i++) {
        let module = {
          id: arr[i].id,
          label: arr[i].name,
          parentID: arr[i].parentID,
          parentPath: arr[i].parentPath,
          isLeaf: arr[i].isLeaf,
          localPath: arr[i].localPath,
          children: []
        }
        if (arr[i].id == '0') {
          firstClassList.push(module);
          module.children = _this.getSecondList(arr, arr[i].id);
        }
      }
      return firstClassList;
    },
    getSecondList(arr, id) {
      let secondClassList = [];
      for (let i = 0; i < arr.length; i++) {
        let module = {
          id: arr[i].id,
          label: arr[i].name,
          parentID: arr[i].parentID,
          parentPath: arr[i].parentPath,
          isLeaf: arr[i].isLeaf,
          localPath: arr[i].localPath,
          children: []
        }
        if (arr[i].parentID == id) {
          secondClassList.push(module);
          module.children = _this.getSecondList(arr, arr[i].id);
        }
      }
      return secondClassList;
    }
  }
}
</script>

<style>
.main {
  padding-top: 5%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.imageDelete {

}

.treeDiv {
  background-color: #3C3F41;
}

.imagesTree {
  padding-left: 5%;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 12px;
  padding: 10px;
  text-align: center;
}

.imagesButton {
  display: flex;
  flex-direction: row;
}
</style>
