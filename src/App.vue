<template>
  <div>
    <Header></Header>
    <Index></Index>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Index from "@/components/Index";
export default {
  components: { Header, Index },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>