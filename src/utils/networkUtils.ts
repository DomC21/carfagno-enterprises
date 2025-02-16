export function generateNetworkConnections(layers: number[]) {
  const connections: Array<{
    from: { layer: number; node: number }
    to: { layer: number; node: number }
    weight: number
  }> = []

  // Generate connections between layers
  for (let layerIndex = 0; layerIndex < layers.length - 1; layerIndex++) {
    const currentLayerSize = layers[layerIndex]
    const nextLayerSize = layers[layerIndex + 1]

    // Connect each node in current layer to each node in next layer
    for (let fromNode = 0; fromNode < currentLayerSize; fromNode++) {
      for (let toNode = 0; toNode < nextLayerSize; toNode++) {
        connections.push({
          from: { layer: layerIndex, node: fromNode },
          to: { layer: layerIndex + 1, node: toNode },
          weight: Math.random() * 2 - 1 // Random weight between -1 and 1
        })
      }
    }
  }

  return connections
}

export function updateNetworkWeights(connections: Array<{
  from: { layer: number; node: number }
  to: { layer: number; node: number }
  weight: number
}>, learningRate: number) {
  return connections.map(connection => ({
    ...connection,
    weight: connection.weight + (Math.random() * 2 - 1) * learningRate
  }))
}
