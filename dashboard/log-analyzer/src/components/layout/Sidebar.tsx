'use client';

import { GenericCounter } from "@/components/metrics/GenericCounter";
import { useCallback, useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Add this effect to listen to refresh events
  useEffect(() => {
    const handleRefresh = () => {
      setRefreshTrigger(prev => !prev);
    };
    
    window.addEventListener('refresh-filters', handleRefresh);
    return () => window.removeEventListener('refresh-filters', handleRefresh);
  }, []);

  // Update URL with new filters
  const createFilterHandler = useCallback((filterName: string) => {
    return (selected: string[]) => {
      const params = new URLSearchParams(searchParams.toString());
      
      if (selected.length > 0) {
        params.set(filterName, selected.join(','));
      } else {
        params.delete(filterName);
      }
      
      router.replace(`${pathname}?${params.toString()}`);
    };
  }, [pathname, router, searchParams]);

  const handleExpand = () => {
    setIsCollapsed(false);
  };

  const handleCollapse = () => {
    setIsCollapsed(true);
  };

  return (
    <aside className={cn("relative transition-all duration-300 ease-in-out p-6 [&_*]:cursor-pointer",
      isCollapsed ? "w-42" : "w-[317px]"
    )}>
      {isCollapsed ? (
        <div className="w-[88px] h-[88px] bg-white rounded-2xl flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="btn-icon"
            onClick={handleExpand}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_2946_29178)">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.884034 7.6667C0.884034 7.29943 1.18176 7.0017 1.54903 7.0017L7.2293 7.0017L5.79309 5.56549C5.5334 5.30579 5.5334 4.88474 5.79309 4.62504C6.05279 4.36534 6.47385 4.36534 6.73355 4.62504L9.30497 7.19647C9.42969 7.32118 9.49975 7.49033 9.49975 7.6667C9.49975 7.84307 9.42969 8.01221 9.30497 8.13692L6.73355 10.7084C6.47385 10.968 6.05279 10.968 5.79309 10.7084C5.53339 10.4487 5.53339 10.0276 5.79309 9.7679L7.2293 8.3317L1.54903 8.3317C1.18176 8.3317 0.884034 8.03397 0.884034 7.6667Z" fill="#333B69"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.45544 13.6667C9.45544 13.2994 9.75317 13.0017 10.1204 13.0017L11.8347 13.0017C12.113 13.0017 12.3799 12.8911 12.5767 12.6944C12.7735 12.4976 12.884 12.2307 12.884 11.9524L12.884 3.38098C12.884 3.10269 12.7735 2.83581 12.5767 2.63903C12.3799 2.44225 12.113 2.3317 11.8347 2.3317L10.1204 2.3317C9.75318 2.3317 9.45545 2.03397 9.45545 1.6667C9.45545 1.29943 9.75318 1.0017 10.1204 1.0017L11.8347 1.0017C12.4658 1.0017 13.0709 1.25237 13.5171 1.69857C13.9633 2.14478 14.214 2.74996 14.214 3.38098L14.214 11.9524C14.214 12.5834 13.9633 13.1886 13.5171 13.6348C13.0709 14.081 12.4658 14.3317 11.8347 14.3317L10.1204 14.3317C9.75317 14.3317 9.45544 14.034 9.45544 13.6667Z" fill="#333B69"/>
                </g>
            </svg>
          </Button>
        </div>
      ) : (
        <div className="h-[calc(100vh-48px)] bg-white rounded-2xl">
          <div className={cn(
            "overflow-y-auto p-6 space-y-4 h-full"
          )}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[15px] leading-6 font-semibold text-text-primary">
                Filter by:
              </h2>
              <Button
                variant="ghost"
                size="icon"
                className="btn-icon"
                onClick={handleCollapse}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.116 8.3333C15.116 8.70057 14.8183 8.9983 14.451 8.9983H8.77077L10.207 10.4345C10.4667 10.6942 10.4667 11.1153 10.207 11.375C9.94727 11.6347 9.52621 11.6347 9.26652 11.375L6.69509 8.80353C6.57038 8.67882 6.50031 8.50967 6.50031 8.3333C6.50031 8.15694 6.57038 7.98779 6.69509 7.86308L9.26652 5.29165C9.52621 5.03195 9.94727 5.03195 10.207 5.29165C10.4667 5.55135 10.4667 5.9724 10.207 6.2321L8.77077 7.6683L14.451 7.6683C14.8183 7.6683 15.116 7.96603 15.116 8.3333Z" fill="#333B69"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.54462 2.3333C6.54462 2.70057 6.24689 2.9983 5.87962 2.9983L4.16533 2.9983C3.88704 2.9983 3.62015 3.10885 3.42337 3.30563C3.22659 3.50241 3.11604 3.7693 3.11604 4.04759L3.11604 12.619C3.11604 12.8973 3.22659 13.1642 3.42337 13.361C3.62015 13.5578 3.88704 13.6683 4.16533 13.6683H5.87962C6.24689 13.6683 6.54462 13.966 6.54462 14.3333C6.54462 14.7006 6.24689 14.9983 5.87962 14.9983H4.16533C3.5343 14.9983 2.92912 14.7476 2.48292 14.3014C2.03672 13.8552 1.78605 13.25 1.78605 12.619L1.78605 4.04759C1.78605 3.41656 2.03672 2.81138 2.48292 2.36518C2.92912 1.91898 3.53431 1.6683 4.16533 1.6683L5.87962 1.6683C6.24689 1.6683 6.54462 1.96604 6.54462 2.3333Z" fill="#333B69"/>
                </svg>
              </Button>
            </div>

            <div className="space-y-4">
              {/* Log Levels */}
              <GenericCounter 
                columnName="level"
                title="Log Levels"
                onSelectionChange={createFilterHandler('level')}
                shouldRefresh={refreshTrigger}
              />
              
              {/* Environments */}
              <GenericCounter 
                columnName="environment"
                title="Environments"
                onSelectionChange={createFilterHandler('environment')}
                shouldRefresh={refreshTrigger}
              />
              
              {/* Services */}
              <GenericCounter 
                columnName="service"
                title="Services"
                onSelectionChange={createFilterHandler('service')}
                shouldRefresh={refreshTrigger}
              />
              
              {/* HTTP Methods */}
              <GenericCounter 
                columnName="request_method"
                title="HTTP Methods"
                onSelectionChange={createFilterHandler('request_method')}
                shouldRefresh={refreshTrigger}
              />
              
              {/* Status Codes */}
              <GenericCounter 
                columnName="status_code"
                title="Status Codes"
                onSelectionChange={createFilterHandler('status_code')}
                shouldRefresh={refreshTrigger}
              />

              {/* Request Paths */}
              <GenericCounter 
                columnName="request_path"
                title="Request Paths"
                onSelectionChange={createFilterHandler('request_path')}
                shouldRefresh={refreshTrigger}
              />

              {/* User Agents */}
              <GenericCounter 
                columnName="user_agent"
                title="User Agents"
                onSelectionChange={createFilterHandler('user_agent')}
                shouldRefresh={refreshTrigger}
              />
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}