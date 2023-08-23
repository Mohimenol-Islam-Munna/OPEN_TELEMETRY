const { NodeSDK } = require("@opentelemetry/sdk-node");
const {
  NodeTracerProvider,
  BatchSpanProcessor,
  SimpleSpanProcessor,
  ConsoleSpanExporter,
} = require("@opentelemetry/sdk-trace-node");
const { Resource } = require("@opentelemetry/resources");
const { registerInstrumentations } = require("@opentelemetry/instrumentation");
const {
  SemanticResourceAttributes,
} = require("@opentelemetry/semantic-conventions");
const {
  OTLPTraceExporter,
} = require("@opentelemetry/exporter-trace-otlp-proto");
const {
  getNodeAutoInstrumentations,
} = require("@opentelemetry/auto-instrumentations-node");
const { ZoneContextManager } = require("@opentelemetry/context-zone");
const { trace } = require("@opentelemetry/api");

const {
  PeriodicExportingMetricReader,
  ConsoleMetricExporter,
} = require("@opentelemetry/sdk-metrics");

const {
  OTLPMetricExporter,
} = require("@opentelemetry/exporter-metrics-otlp-proto");

// const otlpWithNode = new NodeSDK({
//   resource: new Resource({
//     [SemanticResourceAttributes.SERVICE_NAME]: "Express-Backend",
//   }),
//   traceExporter: new ConsoleSpanExporter(),
//   metricReader: new PeriodicExportingMetricReader({
//     exporter: new OTLPMetricExporter({
//       headers: {},
//     }),
//   }),
//   instrumentations: [getNodeAutoInstrumentations()],
// });

// otlpWithNode.start();

const TracerProvider = () => {
  const provider = new NodeTracerProvider({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: "OPENTELEMETRY-WITH-NODE",
    }),
  });

  const consoleExporter = new ConsoleSpanExporter();

  const collectorExporter = new OTLPTraceExporter({
    headers: {},
  });

  provider.addSpanProcessor(new SimpleSpanProcessor(consoleExporter));
  provider.addSpanProcessor(new BatchSpanProcessor(collectorExporter));

  provider.register();

  registerInstrumentations({
    instrumentations: [getNodeAutoInstrumentations()],
    tracerProvider: provider,
  });

  trace.getTracer("OPENTELEMETRY-WITH-NODE");
};

module.exports = TracerProvider;
