import {
  EuiAvatar,
  EuiCollapsibleNav,
  EuiCollapsibleNavGroup,
  EuiFlexItem,
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiHeader,
  EuiHeaderLogo,
  EuiHeaderSectionItemButton,
  EuiHorizontalRule,
  EuiIcon,
  EuiListGroup,
  EuiListGroupItem,
  EuiPopover,
  EuiPortal,
  EuiShowFor,
  EuiText,
  EuiTitle,
} from "@elastic/eui";
import React, { FunctionComponent, useState } from "react";
import { Switch, useHistory } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./stores/store";
import "./App.scss";
import { ElasticMark } from "./kui/elastic_mark";
import { orderedCategories, routes } from "./routes";
import { getLinks, RouteWithSubRoutes, _onClick } from "./utils/routing";

function getCategoryLocalStorageKey(id: string) {
  return `core.navGroup.${id}`;
}

function getIsCategoryOpen(id: string, storage: Storage) {
  const value = storage.getItem(getCategoryLocalStorageKey(id)) ?? "true";

  return value === "true";
}

function setIsCategoryOpen(id: string, isOpen: boolean, storage: Storage) {
  storage.setItem(getCategoryLocalStorageKey(id), `${isOpen}`);
}

const App: FunctionComponent = () => {
  const history = useHistory();
  const storage = window.localStorage;
  const [isAlertFlyoutVisible, setIsAlertFlyoutVisible] = useState(false);
  const [isUserMenuVisible, setIsUserMenuVisible] = useState(false);
  const [isSpacesMenuVisible, setIsSpacesMenuVisible] = useState(false);
  const [navIsOpen, setNavIsOpen] = useState(false);
  const [navIsDocked, setNavIsDocked] = useState(
    JSON.parse(String(localStorage.getItem("navIsDocked"))) ?? false
  );
  const publicRoutes = ["/login"];
  const isPublicRoutes = publicRoutes.includes(window.location.pathname);
  const links = getLinks(history, setNavIsOpen);

  return (
    <>
      {isPublicRoutes || (
        <EuiHeader
          theme="dark"
          position="fixed"
          sections={[
            {
              items: [
                <EuiHeaderLogo aria-label="Elastic">
                  <ElasticMark />
                </EuiHeaderLogo>,
              ],
              borders: "none",
            },
            {
              items: [
                <EuiHeaderSectionItemButton
                  notification={true}
                  aria-label="Notifications: Updates available"
                  onClick={() => setIsAlertFlyoutVisible(!isAlertFlyoutVisible)}
                >
                  <EuiIcon type="cheer" size="m" />
                </EuiHeaderSectionItemButton>,
                <EuiPopover
                  id="guideHeaderUserMenuExample"
                  ownFocus
                  repositionOnScroll
                  button={
                    <EuiHeaderSectionItemButton
                      aria-controls="guideHeaderUserMenuExample"
                      aria-expanded={isUserMenuVisible}
                      aria-haspopup="true"
                      aria-label="User menu"
                      onClick={() => setIsUserMenuVisible(!isUserMenuVisible)}
                    >
                      <EuiAvatar name="John Username" size="s" />
                    </EuiHeaderSectionItemButton>
                  }
                  isOpen={isUserMenuVisible}
                  anchorPosition="downRight"
                  closePopover={() => setIsUserMenuVisible(false)}
                >
                  <div style={{ width: 320 }}>
                    <EuiText size="s" color="subdued">
                      <p>{"// TODO user menu"}</p>
                    </EuiText>
                  </div>
                </EuiPopover>,
              ],
              borders: "none",
            },
          ]}
        />
      )}
      {isPublicRoutes || (
        <EuiHeader
          position="fixed"
          sections={[
            {
              items: [
                <EuiCollapsibleNav
                  id="guideHeaderCollapsibleNavExample"
                  aria-label="Main navigation"
                  isOpen={navIsOpen}
                  isDocked={navIsDocked}
                  button={
                    <EuiHeaderSectionItemButton
                      aria-label="Toggle main navigation"
                      onClick={() => setNavIsOpen(!navIsOpen)}
                    >
                      <EuiIcon type={"menu"} size="m" aria-hidden="true" />
                    </EuiHeaderSectionItemButton>
                  }
                  onClose={() => setNavIsOpen(false)}
                >
                  <EuiFlexItem grow={false} style={{ flexShrink: 0 }}>
                    <EuiCollapsibleNavGroup
                      background="light"
                      className="eui-yScroll"
                      style={{ maxHeight: "40vh" }}
                    >
                      <EuiListGroup
                        aria-label="Pinned links"
                        listItems={[
                          {
                            label: "Home",
                            iconType: "home",
                            href: history.createHref({ pathname: "" }),
                            onClick: (event) => {
                              setNavIsOpen(false);
                              _onClick("", history)(event);
                            },
                          },
                        ]}
                        maxWidth="none"
                        color="text"
                        gutterSize="none"
                        size="s"
                      />
                    </EuiCollapsibleNavGroup>
                  </EuiFlexItem>
                  <EuiHorizontalRule margin="none" />
                  <EuiFlexItem className="eui-yScroll">
                    {orderedCategories.map(({ id, icon, label }) => {
                      return (
                        <EuiCollapsibleNavGroup
                          key={id}
                          iconType={icon}
                          title={label}
                          isCollapsible={true}
                          initialIsOpen={getIsCategoryOpen(id, storage)}
                          onToggle={(isCategoryOpen) =>
                            setIsCategoryOpen(id, isCategoryOpen, storage)
                          }
                        >
                          <EuiListGroup
                            aria-label={`Primary navigation links, ${label}`}
                            listItems={links[id]}
                            maxWidth="none"
                            color="subdued"
                            gutterSize="none"
                            size="s"
                          />
                        </EuiCollapsibleNavGroup>
                      );
                    })}
                  </EuiFlexItem>
                  <EuiFlexItem grow={false}>
                    {/* Docking button only for larger screens that can support it*/}
                    <EuiShowFor sizes={["l", "xl"]}>
                      <EuiCollapsibleNavGroup>
                        <EuiListGroupItem
                          size="xs"
                          color="subdued"
                          label={`${
                            navIsDocked ? "Undock" : "Dock"
                          } navigation`}
                          onClick={() => {
                            setNavIsDocked(!navIsDocked);
                            localStorage.setItem(
                              "navIsDocked",
                              JSON.stringify(!navIsDocked)
                            );
                          }}
                          iconType={navIsDocked ? "lock" : "lockOpen"}
                        />
                      </EuiCollapsibleNavGroup>
                    </EuiShowFor>
                  </EuiFlexItem>
                </EuiCollapsibleNav>,
                <EuiPopover
                  id="guideHeaderSpacesMenuExample"
                  ownFocus
                  repositionOnScroll
                  button={
                    <EuiHeaderSectionItemButton
                      aria-controls="guideHeaderSpacesMenuExample"
                      aria-expanded={isSpacesMenuVisible}
                      aria-haspopup="true"
                      aria-label="Spaces menu"
                      onClick={() =>
                        setIsSpacesMenuVisible(!isSpacesMenuVisible)
                      }
                    >
                      <EuiAvatar type="space" name="Default Space" size="s" />
                    </EuiHeaderSectionItemButton>
                  }
                  isOpen={isSpacesMenuVisible}
                  anchorPosition="downRight"
                  closePopover={() => setIsSpacesMenuVisible(false)}
                >
                  <div style={{ width: 320 }}>
                    <EuiText size="s" color="subdued">
                      <p>{"// TODO spaces"}</p>
                    </EuiText>
                  </div>
                </EuiPopover>,
              ],
            },
          ]}
        />
      )}
      <Provider store={store}>
        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
      </Provider>
      {isPublicRoutes ||
        (isAlertFlyoutVisible && (
          <EuiPortal>
            <EuiFlyout
              onClose={() => setIsAlertFlyoutVisible(false)}
              size="s"
              id="guideHeaderAlertExample"
              aria-labelledby="guideHeaderAlertExampleTitle"
            >
              <EuiFlyoutHeader hasBorder>
                <EuiTitle size="s">
                  <h2 id="guideHeaderAlertExampleTitle">EuiHeaderAlert</h2>
                </EuiTitle>
              </EuiFlyoutHeader>
              <EuiFlyoutBody>
                <EuiText size="s" color="subdued">
                  <p>{"// TODO alerts flyout"}</p>
                </EuiText>
              </EuiFlyoutBody>
            </EuiFlyout>
          </EuiPortal>
        ))}
    </>
  );
};

export default App;
