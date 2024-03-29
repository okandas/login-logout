import * as d3 from 'd3'

export default class DonutChart {
    dataset: Record<string, any>

    constructor (data: Record<string, any>) {
      this.dataset = data
    }

    create () {
      const width = 220
      const height = 220
      const radius = height / 2 - 10

      const svg = d3.select('#donut')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('class', 'donut')
        .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')')

      this.bakeDonut(svg, radius)
      this.createCenter(radius)
    }

    bakeDonut (svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>, radius: number) {
      const color = d3.scaleOrdinal()
        .range(['#5A39AC', '#DD98D6', '#E7C820', '#08B2B2', '#3498DB'])

      const pie = d3.pie()
        .sort(null)
        .padAngle(0.06)
        .value(function (d: any) {
          return d.val
        })

      const arc = d3.arc()
        .innerRadius(radius - 10)
        .outerRadius(radius)

      // Start joining data with paths
      const paths = svg.selectAll('path')
        .data(pie(this.dataset.data))

      const setCenterText = (donut: any) => {
        const sum = d3.sum(donut.selectAll('.clicked').data(), function (d: any) {
          return d.data.val
        })

        donut.select('.value')
          .text(function (d: any) {
            return (sum) ? sum + d.unit : d.total + d.unit
          })

        donut.select('.percentage')
          .text(function (d: any) {
            return (sum) ? (sum / d.total * 100) + '%' : ''
          })
      }

      const animatePath = (path: any, dir: boolean) => {
        const height = 220
        const radius = height / 2 - 10

        switch (dir) {
          case false:
            path.transition()
              .duration(500)
              .attr('d', d3.arc()
                .innerRadius(radius - 10)
                .outerRadius(radius))
            break
          case true:
            path.transition()
              .attr('d', d3.arc()
                .innerRadius(radius + 8)
                .outerRadius(radius - 10))
            break
        }
      }

      paths
        .transition()
        .duration(1000)
        .attr('d', arc)
        .style('fill', '#fff')

      paths.enter()
        .append('path')
        .attr('d', arc)
        .on('click', function () {
          const donut = d3.select('.donut')

          const thisPath = d3.select(this)

          const clicked = thisPath.classed('clicked')

          animatePath(thisPath, !clicked)

          thisPath.classed('clicked', !clicked)

          setCenterText(donut)
        })
        .style('fill', function (d: any, i: number) {
          return color(i)
        })
        .style('stroke', '#FFFFFF')

      paths.exit().remove()
    }

    donutCategoryNames () {
      const categoryNames: string[] = []
      this.dataset.data.forEach(function (d: any) {
        categoryNames.push(d.cat)
      })

      return categoryNames
    }

    createCenter (radius: number) {
      const donut = d3.select('.donut')
        .data(this.dataset.data)

      // The circle displaying total data.
      donut.append('circle')
        .attr('r', radius * 0.8)
        .style('fill', '#fff')
        // .on('click', function () {
        // })

      donut.append('text')
        .attr('class', 'center-txt type')
        .attr('y', radius * -0.09)
        .attr('text-anchor', 'middle')
        .style('font-weight', 'bold')
        .style('color', '#fff')
        .text(function (d: any) {
          return d.type
        })

      donut.append('text')
        .attr('class', 'center-txt value')
        .attr('y', radius * 0.20)
        .attr('text-anchor', 'middle')
        .style('color', '#fff')
        .text(function (d: any) {
          return d.val
        })

      donut.append('text')
        .attr('class', 'center-txt percentage')
        .attr('y', radius * 0.38)
        .attr('text-anchor', 'middle')
        .style('fill', '#fff')
    }
}
