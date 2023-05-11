<template>
  <ul :class="'pagination ' + alignClass">
    <template v-for="(item, index) in tempalteArray">
      <!-- 跳转第一页按钮 -->
      <template v-if="item == '‹‹'">
        <!-- 当前页面为第一页的时候禁用 -->
        <li class="page-item disabled" :key="index" v-if="nlyPgCurrentPage == 1">
          <a class="page-link"> {{ item }}</a>
        </li>
        <!-- 当前页面不为第一页的时候 -->
        <li class="page-item nly-pagination-item" v-else @click="_firstFunction">
          <a class="page-link"> {{ item }}</a>
        </li>
      </template>

      <!-- 上一页按钮 -->
      <template v-else-if="item == '‹'">
        <!-- 当前页面为第一页的时候禁用 -->
        <li class="page-item disabled" :key="index" v-if="nlyPgCurrentPage == 1">
          <a class="page-link"> {{ item }}</a>
        </li>

        <!-- 当前页面不为第一页的时候 -->
        <li class="page-item nly-pagination-item" v-else @click="_prevFunction">
          <a class="page-link"> {{ item }}</a>
        </li>
      </template>

      <!-- 省略按钮 禁用 -->
      <template v-else-if="item == '···'">
        <li class="page-item disabled" :key="index">
          <a class="page-link"> {{ item }}</a>
        </li>
      </template>

      <!-- 跳转到最后一页按钮 -->
      <template v-else-if="item == '››'">
        <!-- 当前页面为最后一页的时候禁用 -->
        <li class="page-item disabled" :key="index" v-if="nlyPgCurrentPage == nlyPgPages">
          <a class="page-link"> {{ item }}</a>
        </li>
        <!-- 当前页面不为最后一页的时候 -->
        <li class="page-item nly-pagination-item" v-else @click="_lastFunction">
          <a class="page-link"> {{ item }}</a>
        </li>
      </template>

      <!-- 下一页按钮 -->
      <template v-else-if="item == '›'">
        <!-- 当前页面为最后一页的时候禁用 -->
        <li class="page-item disabled" :key="index" v-if="nlyPgCurrentPage == nlyPgPages">
          <a class="page-link"> {{ item }}</a>
        </li>
        <!-- 当前页面不为最后一页的时候 -->
        <li class="page-item nly-pagination-item" v-else @click="_nextFunction">
          <a class="page-link"> {{ item }}</a>
        </li>
      </template>

      <!-- 当前页码激活状态 -->
      <template v-else-if="item == tempalteCurrentPage">
        <li class="page-item active nly-pagination-item" :key="index" @click="_currentFunction(item)">
          <a class="page-link"> {{ item }}</a>
        </li>
      </template>

      <!-- 点击跳转页码 -->
      <template v-else>
        <li class="page-item nly-pagination-item" :key="index" @click="_currentFunction(item)">
          <a class="page-link"> {{ item }}</a>
        </li>
      </template>
    </template>
  </ul>
</template>

<script>
export default {
  name: "pagination",
  data() {
    return {
      tempalteCurrentPage: ""
    };
  },
  props: {
    //总数据
    total: {
      type: [Number, String],
      required: true
    },
    // 每页数量
    size: {
      type: [Number, String],
      default: 10
    },
    // 初始页码
    currentPage: {
      type: [Number, String],
      default: 1
    },
    // 分页显示数量
    limit: {
      type: [Number, String],
      default: 5
    },
    // 分页位置
    align: {
      default: "left",
      type: String
    },
    // 跳转第一页按钮触发函数
    firstFunction: {
      type: Function,
      required: true
    },
    // 上一页按钮触发函数
    prevFunction: {
      type: Function,
      required: true
    },
    // 点击页码触发函数
    currentFunction: {
      type: Function,
      required: true
    },
    // 下一页按钮触发函数
    nextFunction: {
      type: Function,
      required: true
    },
    // 最后一页按钮触发函数
    lastFunction: {
      type: Function,
      required: true
    },
    // 修改每页数量触发函数
    sizeFunction: {
      type: Function
    }
  },
  methods: {
    // 字符串转为数字类型
    toInteger(val) {
      return parseInt(val, 10);
    },
    // 跳转第一页按钮触发函数
    _firstFunction() {
      if (this.firstFunction) {
        this.tempalteCurrentPage = 1;
        this.firstFunction();
      }
    },
    // 上一页按钮触发函数
    _prevFunction() {
      if (this.prevFunction) {
        this.tempalteCurrentPage = this.tempalteCurrentPage - 1;
        this.prevFunction();
      }
    },
    // 点击页码触发函数
    _currentFunction(item) {
      if (this.currentFunction) {
        this.tempalteCurrentPage = item;
        this.currentFunction();
      }
    },
    // 下一页按钮触发函数
    _nextFunction() {
      if (this.nextFunction) {
        this.tempalteCurrentPage = this.tempalteCurrentPage + 1;
        this.nextFunction();
      }
    },
    // 最后一页按钮触发函数
    _lastFunction() {
      if (this.lastFunction) {
        this.tempalteCurrentPage = this.nlyPgPages;
        this.lastFunction();
      }
    },
    // 修改每页数量触发函数
    _sizeFunction() {
      if (this.sizeFunction) {
        this.sizeFunction();
      }
    },
    // 分页元素添加上一页，最后一页，第一页，下一页等按钮
    _tempalteArray() {
      let nlyPgItemArrayAll = this.nlyPgItemArray;
      nlyPgItemArrayAll.splice(0, 0, "‹");
      nlyPgItemArrayAll.splice(0, 0, "‹‹");
      nlyPgItemArrayAll.push("›");
      nlyPgItemArrayAll.push("››");

      return nlyPgItemArrayAll;
    }
  },
  computed: {
    // 转换总页转为数字类型
    nlyPgTotal: function () {
      return isNaN(this.toInteger(this.total))
        ? 1
        : this.toInteger(this.total) <= 0
          ? 1
          : this.toInteger(this.total);
    },
    // 每页数量转为数字类型
    nlyPgSize: function () {
      return isNaN(this.toInteger(this.size))
        ? 10
        : this.toInteger(this.size) <= 0
          ? 10
          : this.toInteger(this.size);
    },
    // 当前页数转为数字类型
    nlyPgCurrentPage: function () {
      return this.toInteger(this.tempalteCurrentPage);
    },
    // 分页显示元素转为数字类型
    nlyPgLimit: function () {
      return isNaN(this.toInteger(this.limit))
        ? 5
        : this.toInteger(this.limit) <= 4
          ? 5
          : this.toInteger(this.limit);
    },
    // 计算总页数
    nlyPgPages: function () {
      return Math.ceil(this.nlyPgTotal / this.nlyPgSize);
    },
    // 生成不包括上一页，下一页等按钮的分页元素
    nlyPgItemArray: function () {
      if (
        this.nlyPgCurrentPage + 1 <= this.nlyPgLimit &&
        this.nlyPgPages < this.nlyPgLimit
      ) {
        // 当前页码+1小于分页元素且总页数大于分页元素
        const itemList = Array.from({ length: this.nlyPgPages }).map(
          (v, k) => k + 1
        );
        return itemList;
      } else if (
        this.nlyPgCurrentPage + 1 <= this.nlyPgLimit &&
        this.nlyPgPages == this.nlyPgLimit
      ) {
        // 当前页码+1小于分页元素且总页数等于分页元素
        const itemList = Array.from({ length: this.nlyPgLimit }).map(
          (v, k) => k + 1
        );
        return itemList;
      } else if (
        this.nlyPgCurrentPage + 2 <= this.nlyPgLimit &&
        this.nlyPgPages > this.nlyPgLimit
      ) {
        // 当前页码+2小于分页元素且总页数大于分页元素
        const itemList = Array.from({ length: this.nlyPgLimit - 1 }).map(
          (v, k) => k + 1
        );
        itemList.push("···");
        return itemList;
      } else if (
        this.nlyPgPages - this.nlyPgCurrentPage + 2 < this.nlyPgLimit &&
        this.nlyPgPages > this.nlyPgLimit
      ) {
        // 总页数-当前页码+2小于分页元素且总页数大于分页元素
        const itemList = Array.from({ length: this.nlyPgLimit - 1 }).map(
          (v, k) => k + (this.nlyPgPages - this.nlyPgLimit + 2)
        );
        itemList.splice(0, 0, "···");
        return itemList;
      } else if (
        // 总页数-当前页码+2小于分页元素且总页数等于分页元素
        this.nlyPgPages - this.nlyPgCurrentPage + 2 < this.nlyPgLimit &&
        this.nlyPgPages == this.nlyPgLimit
      ) {
        const itemList = Array.from({ length: this.nlyPgLimit - 1 }).map(
          (v, k) => k + (this.nlyPgPages - this.nlyPgLimit + 2)
        );
        return itemList;
      } else {
        // 其他情况
        const itemList = Array.from({ length: this.nlyPgLimit - 2 }).map(
          (v, k) =>
            k + this.nlyPgCurrentPage - Math.ceil(this.nlyPgLimit / 2) + 2
        );
        itemList.splice(0, 0, "···");
        itemList.push("···");
        return itemList;
      }
    },
    // 分页位置
    alignClass: function () {
      const align = this.align;
      if (align === "center") {
        return "justify-content-center";
      } else if (align === "end" || align === "right") {
        return "justify-content-end";
      }
      return "";
    },
    // 生成包括最后一页，上一页，第一页，下一页等按钮的元素，最终分页元素
    tempalteArray: function () {
      return this._tempalteArray();
    }
  },
  created() {
    // 初始化初始页面
    this.tempalteCurrentPage = isNaN(this.toInteger(this.currentPage))
      ? 1
      : this.toInteger(this.currentPage) <= 1
        ? 1
        : this.toInteger(this.currentPage);
  },
  watch: {
    // 暴露当前页码给父组件（变化之前的，如果从第4页跳转到第5页，父组件获取的值是4）
    tempalteCurrentPage: function () {
      this.$emit("getCurrentPage", this.tempalteCurrentPage);
    },
    // 监测父组件传入的初始页码currentPage，发生变化就给分页当前页码赋值
    currentPage: function (newval, oldval) {
      if (newval != oldval) {
        this.tempalteCurrentPage = this.toInteger(this.currentPage);
      }
    },
    // 监测总页数,当页数(即总数量发生变化的时候),如果当前页码大于总页数,当前页码变为最大页面，否则不变,
    nlyPgPages: function (newval, oldval) {
      if (newval != oldval) {
        this.tempalteCurrentPage =
          this.tempalteCurrentPage > newval ? newval : this.tempalteCurrentPage;
      }
    },
    // 监测每页数量变化，发生变化的时候，重新执行_sizeFunction()，不传入组件参数sizeFunction也会执行。
    nlyPgSize: function (newval, oldval) {
      if (newval != oldval) {
        this._sizeFunction();
      }
    }
  }
};
</script>

<style>
.nly-pagination-item {
  cursor: pointer;
  color: #007bff;
}
</style>
<!--
total: 总数
size： 每页数量，默认10
currentPage: 初始页码
limit: 显示页码个数
align：分页位置,left左边，center中间，right右边，默认左边
firstFunction: 第一页按钮函数
prevFunction: 上一页按钮函数
currentFunction: 点击页码函数
nextFunction: 下一页页码函数
lastFunction: 最后一页页码函数
sizeFunction: 修改每页数量自动执行函数
 -->