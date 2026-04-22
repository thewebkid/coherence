<template>
  <div ref="container" class="word-cloud-container">
    <svg ref="svgRef" :width="width" :height="height"></svg>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import * as d3 from 'd3'
import cloud from 'd3-cloud'

const props = defineProps({
  words: { type: Array, required: true }, // your processed array: [{text, size, fill, fontWeight}, ...]
  width: { type: Number, default: 800 },
  height: { type: Number, default: 500 }
})

const container = ref(null)
const svgRef = ref(null)

const drawCloud = (wordsData) => {
  if (!wordsData?.length || !svgRef.value) return

  const svg = d3.select(svgRef.value)
  svg.selectAll('*').remove()   // clear previous render

  // Important: create a centered group
  const g = svg.append('g')
      .attr('transform', `translate(${props.width / 2}, ${props.height / 2})`)

  const layout = cloud()
      .size([props.width, props.height])
      .words(wordsData.map(d => ({
        ...d,
        size: d.size
      })))
      .padding(4)                    // increase a bit if words overlap too much
      .rotate(0)                     // keep 0 for now; you can experiment with () => ~~(Math.random() * 2) * 90 - 45 later
      .font('system-ui, sans-serif')
      .fontSize(d => d.size)
      .on('end', (outputWords) => {
        g.selectAll('text')
            .data(outputWords)
            .enter()
            .append('text')
            .style('font-size', d => `${d.size}px`)
            .style('fill', d => d.fill || '#000')
            .style('font-weight', d => d.fontWeight || 'normal')
            .style('cursor', 'pointer')
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'middle')   // helps vertical alignment
            .attr('transform', d => `translate(${d.x}, ${d.y}) rotate(${d.rotate || 0})`)
            .text(d => d.text)
            .on('mouseover', function() {
              d3.select(this).transition().duration(150).style('opacity', 0.7)
            })
            .on('mouseout', function() {
              d3.select(this).transition().duration(150).style('opacity', 1)
            })
      })

  layout.start()
}
watch(() => props.words, (newWords) => {
  drawCloud(newWords)
}, { immediate: true })

onMounted(() => {
  // Optional: resize observer if you want responsive
})
</script>

<style scoped>
.word-cloud-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
