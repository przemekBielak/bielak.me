<template>
  <div class="ml">
    <h1>ml</h1>
  </div>
</template>

<script>
import * as tf from "@tensorflow/tfjs";

export default {
  name: "ml",
  data: function() {
    return {};
  },
  mounted: function() {
    const model = tf.sequential();
    const config_hidden = { inputShape: [3], activation: "sigmoid", units: 4 };
    const config_output = { units: 2, activation: "sigmoid" };
    const hidden = tf.layers.dense(config_hidden);
    const output = tf.layers.dense(config_output);

    model.add(hidden);
    model.add(output);

    const optimize = tf.train.sgd(0.1);
    const config = { optimizer: optimize, loss: "meanSquaredError" };

    model.compile(config);
    console.log("Model Successfully Compiled");

    const x_train = tf.tensor([
      [0.1, 0.5, 0.1],
      [0.9, 0.3, 0.4],
      [0.4, 0.5, 0.5],
      [0.7, 0.1, 0.9]
    ]);

    const y_train = tf.tensor([[0.2, 0.8], [0.9, 0.1], [0.4, 0.6], [0.5, 0.5]]);

    const x_test = tf.tensor([  [0.9,0.1,0.5]])
  }
};
</script>

<style>
</style>

