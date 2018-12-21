FROM alexqian/ember_cli

MAINTAINER Alex Qian

WORKDIR /app

RUN git clone https://github.com/Faiz2/ember-component-demo.git

WORKDIR ember-component-demo

RUN yarn && \
    ember b

EXPOSE 4200

ENTRYPOINT ["ember", "s"]
