/* globals flock, fluid */
(function (flock, fluid) {
    "use strict";
    var whammy = fluid.registerNamespace("whammy");

    fluid.registerNamespace("whammy.iv.drip");

    whammy.iv.drip.sendMessage = function (that, message) {
        var connection = fluid.get(that, "midiOutput.connection");
        if (connection) {
            connection.send(message);
        }
    };

    whammy.iv.drip.sendMode = function (that) {
        whammy.iv.drip.sendMessage(that, {
            channel: 0,
            type: "program",
            program: that.model.mode
        });
    };

    whammy.iv.drip.sendPedal = function (that) {
        whammy.iv.drip.sendMessage(that, {
            channel: 0,
            type: "control",
            number: 11,
            value: that.model.pedal
        });

    };

    fluid.defaults("whammy.iv.drip", {
        gradeNames: ["gpii.binder.bindOnCreate"],
        model: {
            mode:  5,  // 2 octaves down
            pedal: 43, // 4 steps (~21) below the middle position (~64).
        },
        selectors: {
            midiOutput: ".midi-output",
            mode:       "input[name='whammy-mode']",
            pedal:      ".whammy-pedal"
        },
        bindings: {
            mode: {
                path:     "mode",
                selector: "mode",
                rules: {
                    domToModel: {
                        "": {
                            transform: {
                                type: "fluid.transforms.stringToNumber",
                                inputPath: ""
                            }
                        }
                    },
                    modelToDom: {
                        "": {
                            transform: {
                                type: "fluid.transforms.numberToString",
                                inputPath: ""
                            }
                        }
                    }
                }
            },
            pedal: {
                path: "pedal",
                selector: "pedal",
                rules: {
                    domToModel: {
                        "": {
                            transform: {
                                type: "fluid.transforms.stringToNumber",
                                inputPath: ""
                            }
                        }
                    },
                    modelToDom: {
                        "": {
                            transform: {
                                type: "fluid.transforms.numberToString",
                                inputPath: ""
                            }
                        }
                    }
                }
            }
        },
        invokers: {
            sendMode: {
                funcName: "whammy.iv.drip.sendMode",
                args:     ["{that}"]
            },
            sendPedal: {
                funcName: "whammy.iv.drip.sendPedal",
                args:     ["{that}"]
            }
        },
        components: {
            midiOutput: {
                type: "flock.auto.ui.midiConnector",
                container: "{that}.dom.midiOutput",
                options: {
                    preferredDevice: "EIE",
                    portType: "output",
                    components: {
                        midiPortSelector: {
                            options: {
                                strings: {
                                    selectBoxLabel: "MIDI Output",
                                }
                            }
                        },
                        connection: {
                            options: {
                                listeners: {
                                    "onReady.sendMode": {
                                        func: "{whammy.iv.drip}.sendMode"
                                    },
                                    "onReady.sendPedal": {
                                        func: "{whammy.iv.drip}.sendPedal"
                                    }
                                }
                            }
                        }
                    }
                }
            },
        },
        modelListeners: {
            mode: {
                func: "{that}.sendMode",
                excludeSource: "init"
            },
            pedal: {
                func: "{that}.sendPedal",
                excludeSource: "init"
            }
        }
    });
})(flock, fluid);
