import { useCallback, useEffect, useMemo, useState } from "react";
import { FaHandHoldingHeart } from "react-icons/fa";

// Minimal typing for the beforeinstallprompt event
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const getNavigatorStandalone = () => {
  if (typeof window === "undefined") return false;
  const nav = window.navigator as Navigator & { standalone?: boolean };
  return nav.standalone === true;
};

const getIsStandalone = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(display-mode: standalone)").matches || getNavigatorStandalone();
};

const PWAPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState<boolean>(() => getIsStandalone());
  const [isOnline, setIsOnline] = useState<boolean>(() => (typeof navigator !== "undefined" ? navigator.onLine : true));
  const [nextPromptTime, setNextPromptTime] = useState<number>(() => {
    if (typeof window === "undefined") return 0;
    const stored = window.localStorage.getItem("pwaPromptNextTime");
    return stored ? parseInt(stored, 10) : 0;
  });

  const hidePrompt = useCallback(() => setShowPrompt(false), []);

  const scheduleNextPrompt = useCallback(() => {
    const next = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
    setNextPromptTime(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("pwaPromptNextTime", String(next));
    }
    setShowPrompt(false);
    setDeferredPrompt(null);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
      setNextPromptTime(0);
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("pwaPromptNextTime");
      }
    };

    const media = window.matchMedia("(display-mode: standalone)");
    const handleDisplayModeChange = () => {
      const standalone = media.matches || getNavigatorStandalone();
      setIsInstalled(standalone);
      if (standalone) hidePrompt();
    };

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt as EventListener);
    window.addEventListener("appinstalled", handleAppInstalled);
    media.addEventListener("change", handleDisplayModeChange);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Initial sync
    handleDisplayModeChange();
    setIsOnline(navigator.onLine);
    if (deferredPrompt && Date.now() >= nextPromptTime && !isInstalled) {
      setShowPrompt(true);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt as EventListener);
      window.removeEventListener("appinstalled", handleAppInstalled);
      media.removeEventListener("change", handleDisplayModeChange);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [hidePrompt, deferredPrompt, nextPromptTime, isInstalled]);

  const handleInstall = useCallback(async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === "accepted") {
      setShowPrompt(false);
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("pwaPromptNextTime");
      }
    }
    setDeferredPrompt(null);
  }, [deferredPrompt]);

  const handleLater = useCallback(() => {
    scheduleNextPrompt();
  }, [scheduleNextPrompt]);

  const canShowPrompt = useMemo(() => showPrompt && !isInstalled && Date.now() >= nextPromptTime, [showPrompt, isInstalled, nextPromptTime]);

  return (
    <>
      {/* Offline status banner */}
      {!isOnline && (
        <div className="pwa-offline-banner" role="status" aria-live="polite">
          Offline mód: böngészhetsz, de az űrlapok és friss adatok nem érhetők el.
        </div>
      )}

      {/* Install prompt */}
      {canShowPrompt && (
        <div className="pwa-prompt" role="dialog" aria-modal="false" aria-label="Telepítési javaslat">
          <div className="pwa-prompt__content">
            <div className="pwa-prompt__text">
              <div className="pwa-prompt__icon" aria-hidden="true">
                <FaHandHoldingHeart />
              </div>
              <p className="pwa-prompt__title">Telepítsd az alkalmazást</p>
              <p className="pwa-prompt__subtitle">Gyorsabb elérés, könnyebb indulás és alapvető offline használat.</p>
            </div>
            <div className="pwa-prompt__actions">
              <button type="button" className="pwa-prompt__button pwa-prompt__button--primary" onClick={handleInstall}>
                Telepítés
              </button>
              <button type="button" className="pwa-prompt__button" onClick={handleLater}>
                Később
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PWAPrompt;
