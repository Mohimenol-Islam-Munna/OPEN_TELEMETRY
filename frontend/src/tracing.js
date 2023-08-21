import {
  WebTracerProvider,
  SimpleSpanProcessor,
  ConsoleSpanExporter,
  BatchSpanProcessor,
} from "@opentelemetry/sdk-trace-web";
import { Resource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { FetchInstrumentation } from "@opentelemetry/instrumentation-fetch";
import { ZoneContextManager } from "@opentelemetry/context-zone";
import { getWebAutoInstrumentations } from "@opentelemetry/auto-instrumentations-web";

const provider = new WebTracerProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: "OPENTELEMETRY-WITH-REACT",
  }),
});

const consoleExporter = new ConsoleSpanExporter();

const collectorExporter = new OTLPTraceExporter({
  // url: "http://localhost:4318/v1/traces",
  headers: {},
});

const fetchInstrumentation = new FetchInstrumentation({});

fetchInstrumentation.setTracerProvider(provider);

provider.addSpanProcessor(new SimpleSpanProcessor(consoleExporter));
provider.addSpanProcessor(new BatchSpanProcessor(collectorExporter));

provider.register({
  contextManager: new ZoneContextManager(),
});

registerInstrumentations({
  instrumentations: [
    getWebAutoInstrumentations({
      "@opentelemetry/instrumentation-fetch": {},
    }),
  ],
});

export default function TraceProvider({ children }) {
  return children;
}
