'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">Angular Yandex Maps</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="changelog.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CHANGELOG
                            </a>
                        </li>
                        <li class="link">
                            <a href="contributing.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CONTRIBUTING
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter additional">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#additional-pages"'
                            : 'data-target="#xs-additional-pages"' }>
                            <span class="icon ion-ios-book"></span>
                            <span>Additional documentation</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="additional-pages"' : 'id="xs-additional-pages"' }>
                                    <li class="link ">
                                        <a href="additional-documentation/examples.html" data-type="entity-link" data-context-id="additional">Examples</a>
                                    </li>
                                    <li class="link ">
                                        <a href="additional-documentation/faq.html" data-type="entity-link" data-context-id="additional">FAQ</a>
                                    </li>
                        </ul>
                    </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AngularYandexMapsModule.html" data-type="entity-link" >AngularYandexMapsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AngularYandexMapsModule-0ab137c1761ca7f4a19c4b7aabaa9190"' : 'data-target="#xs-components-links-module-AngularYandexMapsModule-0ab137c1761ca7f4a19c4b7aabaa9190"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AngularYandexMapsModule-0ab137c1761ca7f4a19c4b7aabaa9190"' :
                                            'id="xs-components-links-module-AngularYandexMapsModule-0ab137c1761ca7f4a19c4b7aabaa9190"' }>
                                            <li class="link">
                                                <a href="components/YaClustererComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >YaClustererComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/YaMapComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >YaMapComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-AngularYandexMapsModule-0ab137c1761ca7f4a19c4b7aabaa9190"' : 'data-target="#xs-directives-links-module-AngularYandexMapsModule-0ab137c1761ca7f4a19c4b7aabaa9190"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-AngularYandexMapsModule-0ab137c1761ca7f4a19c4b7aabaa9190"' :
                                        'id="xs-directives-links-module-AngularYandexMapsModule-0ab137c1761ca7f4a19c4b7aabaa9190"' }>
                                        <li class="link">
                                            <a href="directives/YaControlDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >YaControlDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/YaGeoObjectDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >YaGeoObjectDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/YaMultirouteDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >YaMultirouteDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/YaPanoramaDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >YaPanoramaDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/YaPlacemarkDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >YaPlacemarkDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/YaApiLoaderService.html" data-type="entity-link" >YaApiLoaderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/YaGeocoderService.html" data-type="entity-link" >YaGeocoderService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/YaConfig.html" data-type="entity-link" >YaConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/YaEvent.html" data-type="entity-link" >YaEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/YaReadyEvent.html" data-type="entity-link" >YaReadyEvent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});